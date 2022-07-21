/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { CreateMedecinDto } from './dto/create-medecin.dto';
import { UpdateMedecinDto } from './dto/update-medecin.dto';
import { catchError, lastValueFrom, map, switchMap, tap } from 'rxjs';
import { throwResponse } from 'src/utils/throw-response';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlink } from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { SmsDto } from './dto/SmsDto';
import { CreateAbonnementDto } from 'src/abonnement/dto/create-abonnement.dto';
import { AbonnementService } from 'src/abonnement/abonnement.service';
import { PaytechService } from 'src/paytech/paytech.service';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { ConsultationService } from 'src/consultation/services/consultation.service';
import { MailService } from 'src/mail/mail.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Payload } from '@nestjs/microservices';
import { SmsService } from 'src/sms/sms.service';
import { add, parseISO } from 'date-fns';

const logger = new Logger('Sms');

@Controller('medecin')
export class MedecinController {
  constructor(
    private readonly medecinService: MedecinService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly abonnementService: AbonnementService,
    private readonly payService: PaytechService,
    private readonly configService: ConfigService,
    private readonly consultationService: ConsultationService,
    private readonly mail: MailService,
    private eventEmmiter: EventEmitter2,
    private smsService: SmsService,
  ) {}

  @Post()
  async create(@Body() createMedecinDto: CreateMedecinDto) {
    const res = await this.medecinService.create(createMedecinDto);
    return res.pipe(
      map(async ({ data: medecin }) => {
        await lastValueFrom(
          this.consultationService.create({
            title: 'consultation générale',
            price: 1,
            time: 0,
            doctorId: medecin._id,
          }),
        );
        await lastValueFrom(
          this.consultationService.create({
            title: 'consultation spéciale',
            price: 1,
            time: 0,
            doctorId: medecin._id,
          }),
        );
        await lastValueFrom(
          this.consultationService.create({
            title: 'autre',
            price: 1,
            time: 0,
            doctorId: medecin._id,
          }),
        );
        await this.mail.sendUserWelcome(medecin);
        await this.smsService.sendWelcome(medecin);
        const { data: user } = await lastValueFrom(
          this.userService.findOne(medecin?.userId),
        );
        const { __v, verification_code, password, ...rest } = user;
        const userToLogin = { ...rest, ...medecin };
        return this.authService.login(userToLogin);
      }),
      catchError(throwResponse),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('upload/image/:id')
  @UseInterceptors(FileInterceptor('profile'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { data: medecin } = await lastValueFrom(
      this.medecinService.findOne(id),
    );
    if (medecin !== null) {
      const { profile_image } = medecin;
      if (existsSync(`./uploads/${profile_image}`))
        if (profile_image !== 'default_avatar.png')
          unlink(`./uploads/${profile_image}`, console.log);
    }
    const updatedObj = { profile_image: file.filename, id };
    return this.medecinService
      .update(updatedObj)
      .pipe(tap(console.log), catchError(throwResponse));
  }

  @Get()
  findAll() {
    return this.medecinService.findAll().pipe(
      map(async (res) => {
        const { data: medecins } = res;
        const med = await Promise.all(
          medecins.map(async (medecin) => {
            if (medecin.abonnement) {
              const { data: abonnemnt } = await lastValueFrom(
                this.abonnementService.findOne(medecin?.abonnement),
              );
              medecin.abonnement = abonnemnt;
            }
            return medecin;
          }),
        );
        return { ...res, data: med };
      }),
    );
  }

  @Post('sendsms')
  sendSms(@Body() smsDto: SmsDto) {
    return this.medecinService.sendSMS(smsDto);
  }

  @Get('searchbyspeciality/:speciality')
  async findBySpeciality(@Param('speciality') speciality: string) {
    const { data: medecins } = await lastValueFrom(this.findAll());
    return medecins.filter((medecin) => medecin.speciality === speciality);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medecinService.findOne(id).pipe(
      map(async (res) => {
        const { data: medecin } = res;
        if (medecin.abonnement) {
          const { data: abonnemnt } = await lastValueFrom(
            this.abonnementService.findOne(medecin?.abonnement),
          );
          medecin.abonnement = abonnemnt;
        }
        return { ...res, data: medecin };
      }),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedecinDto: UpdateMedecinDto) {
    return this.medecinService
      .update({ ...updateMedecinDto, id })
      .pipe(catchError(throwResponse));
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medecinService.remove(id);
  }

  @Post('search/')
  search(@Body() search: { text: string }) {
    return this.medecinService.search(search.text);
  }

  @Post('paiement/:id')
  async Paiement(@Param('id') id: string, @Body() abonnement) {
    const { data: medecin } = await lastValueFrom(
      this.medecinService.findOne(id),
    );
    const dto = JSON.parse(abonnement.data);
    const { data: newabonnement } = await lastValueFrom(
      this.abonnementService.create(dto),
    );
    if (medecin?.abonnement) {
      newabonnement.duree += medecin.abonnement.duree;
      await newabonnement.save();
    }

    const payData = {
      item_name: `Pack Freedocteur ${newabonnement.pack.name}`,
      item_price: newabonnement.price,
      currency: 'XOF',
      ref_command: newabonnement._id,
      command_name: 'Abonnement Freedocteur  via PayTech',
      env: 'test',
      ipn_url: `https://6579-41-82-239-113.in.ngrok.io/medecin/paiementback/ipn/${id}`,
      custom_field: JSON.stringify({
        abonnementId: newabonnement._id,
      }),
    };
    return this.payService.pay(payData);
  }

  @Post('paiementback/ipn/:id')
  async Ipn(@Param('id') id: string, @Body() ipn: any) {
    //  let type_event = ipn.type_event;
    const custom_field = JSON.parse(ipn.custom_field);
    // let ref_command = ipn.ref_command;
    // let item_name = ipn.item_name;
    // let item_price = ipn.item_price;
    // let devise = ipn.devise;
    // let command_name = ipn.command_name;
    // let env = ipn.env;
    // let token = ipn.token;
    const api_key_sha256 = ipn.api_key_sha256;
    const api_secret_sha256 = ipn.api_secret_sha256;

    const my_api_key = this.configService.get('PAYTECH_API_KEY');
    const my_api_secret = this.configService.get('PAYTECH_API_SECRET');

    if (
      this.SHA256Encrypt(my_api_secret) === api_secret_sha256 &&
      this.SHA256Encrypt(my_api_key) === api_key_sha256
    ) {
      const abonnementId = custom_field.abonnementId;
      const { data: abnm } = await lastValueFrom(
        this.abonnementService.update(abonnementId, { isActive: true }),
      );
      const { data: medecin } = await lastValueFrom(
        this.medecinService.findOne(id),
      );
      this.eventEmmiter.emit('abonnement.created', { medecin, abnm });
      return this.medecinService.update({ abonnement: abonnementId, id });
    }
  }

  SHA256Encrypt(password) {
    const sha256 = createHash('sha256');
    sha256.update(password);
    return sha256.digest('hex');
  }

  @OnEvent('abonnement.created', { async: true })
  async AbonnementCreateEvent(@Payload() { medecin, abnm }) {
    const begin = parseISO(medecin.updatedAt);
    const end = add(begin, {
      days: abnm.duree,
    });
    const mes = `
    Paiement réussi !
    Cher Docteur,
Votre paiement a été effectué avec succès.
Votre abonnement couvre la période qui s’étend du ${begin} et pour une durée de ${end} mois.
Nous vous remercions et restons disponibles pour tout complément d’informations.
L’équipe Freedocteur.
    `;
    await lastValueFrom(this.smsService.sendSms([medecin.phoneNumber], mes));
    await this.mail.sendMail(medecin.email, mes, 'Paiement Reussi');
  }
}
