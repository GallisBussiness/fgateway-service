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
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { catchError, lastValueFrom, map, tap } from 'rxjs';
import { throwResponse } from 'src/utils/throw-response';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlink } from 'fs';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    const Obs = await this.patientService.create(createPatientDto);
    return Obs.pipe(
      map(async ({ data: patient }) => {
        const { data: user } = await lastValueFrom(
          this.userService.findOne(patient?.userId),
        );
        const { __v, verification_code, password, ...rest } = user;
        const userToLogin = { ...rest, ...patient };
        return this.authService.login(userToLogin);
      }),
      catchError(throwResponse),
    );
  }

  @Post('auth/google')
  async google(@Body() createPatientDto: CreatePatientDto) {
    const Obs = await this.patientService.regsiterUserFromGoogle(
      createPatientDto,
    );
    return Obs.pipe(
      map(async ({ data: patient }) => {
        const { data: user } = await lastValueFrom(
          this.userService.findOne(patient?.userId),
        );
        const {
          __v,
          verification_code,
          password,
          isGoogle,
          isFacebook,
          ...rest
        } = user;
        const userToLogin = { ...rest, ...patient };
        return this.authService.login(userToLogin);
      }),
      catchError(throwResponse),
    );
  }

  @Get()
  findAll() {
    return this.patientService.findAll().pipe(catchError(throwResponse));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id).pipe(
      map(async ({ data: patient }) => {
        const { data: user } = await lastValueFrom(
          this.userService.findOne(patient?.userId),
        );
        const { __v, verification_code, password, ...rest } = user;
        const userTosend = { ...rest, ...patient };
        return { data: userTosend, statusCode: 200 };
      }),
      catchError(throwResponse),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService
      .update({ ...updatePatientDto, id })
      .pipe(catchError(throwResponse));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }

  @Post('upload/image/:id')
  @UseInterceptors(FileInterceptor('profile'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { data: patient } = await lastValueFrom(
      this.patientService.findOne(id),
    );
    if (patient !== null) {
      const { profile_image } = patient;
      if (existsSync(`./uploads/${profile_image}`))
        if (profile_image !== 'default_avatar.png')
          unlink(`./uploads/${profile_image}`, console.log);
    }
    const updatedObj = { profile_image: file.filename, id };
    return this.patientService
      .update(updatedObj)
      .pipe(tap(console.log), catchError(throwResponse));
  }
}
