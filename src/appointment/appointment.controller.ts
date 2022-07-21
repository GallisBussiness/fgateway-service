/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  Appointment,
  OwnerAndStateAndDate,
  OwnerAndStateAndDates,
} from './dto/appointment.dto';
import { tap, catchError, map, lastValueFrom } from 'rxjs';
import { throwResponse } from 'src/utils/throw-response';
import { PatientService } from 'src/patient/patient.service';
import { StateEnum } from 'src/utils/enums/StateEnum';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { UserService } from 'src/user/user.service';
import { MedecinService } from 'src/medecin/medecin.service';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService,
    private readonly medecinService: MedecinService,
    private readonly notificationsService: NotificationsService,
    private readonly userService: UserService,
    ) {}
  @Post()
  create(@Body() appointment: Appointment) {
    return this.appointmentService.create(appointment).pipe(
      tap(({data}) => this.notify({
        message: "Vous avez reçus un nouveau rendez-vous",
        to: data.doctorId,
        isRead: false
      })),
      catchError(throwResponse),
    );
  }


  async notify(notif: CreateNotificationDto) {
    const { to ,message} = notif;
    return await Promise.all([
      lastValueFrom(this.notificationsService.create(notif)),
      lastValueFrom(this.userService.sendMail({ to, message}))
    ])
  }
  @Patch('changestate')
  changeState(
    @Body()
    payload: {
      id: string;
      state: StateEnum;
    },
  ) {
    return this.appointmentService.changeState(payload).pipe(
      catchError(throwResponse)
    );
  }

  @Patch('reprogram/:id')
  reprogram(@Param('id') id: string, @Body() appointment: Appointment) {
    return this.appointmentService.reprogram(appointment).pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse)
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id).pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse)
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id).pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse)
    );
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll().pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse)
    );
  }

  @Get('findallbystate/:state')
  findAllByState(
    @Param('state')
    state: StateEnum,
  ) {
    return this.appointmentService.findAllByState(state).pipe(
      catchError(throwResponse)
    );
  }

  @Get('findallbydoctor/:id')
  findAllByDoctor(@Param('id') id: string ) {
    return this.appointmentService.findAllByOwner({ownerId: id, ownerType: 'Doctor'}).pipe(
      map(async (res) => {
        const {data:appointments} = res;
         const app = await Promise.all(appointments?.map(async (a: { patient: { patientId: string; }; }) => {
           const {data:patient} = await lastValueFrom(this.patientService.findOne(a.patient.patientId));
           return {...a,patient:{...a.patient,user:patient}}
         }))
        return {...res,data:app};
      }),
      
    );
  }

  @Get('findallbydoctoremergency/:id')
  findAllByDoctorAndEmergency(@Param('id') id: string ) {
    return this.appointmentService.findAllByOwnerAndEmergency(id).pipe(
      map(async (res) => {
        const {data:appointments} = res;
         const app = await Promise.all(appointments?.map(async (a: { patient: { patientId: string; }; }) => {
           const {data:patient} = await lastValueFrom(this.patientService.findOne(a.patient.patientId));
           return {...a,patient:{...a.patient,user:patient}}
         }))
        return {...res,data:app};
      }),
      
    );
  }

  @Get('findallbypatient/:id')
  findAllByPatient(@Param('id') id: string ) {
    return this.appointmentService.findAllByOwner({ownerId: id, ownerType: 'Patient'}).pipe(
      map(async (res) => {
        const {data:appointments} = res;
         const app = await Promise.all(appointments?.map(async (a) => {
           const {data:medecin} = await lastValueFrom(this.medecinService.findOne(a.doctorId));
           return {...a,medecin:{...medecin}}
         }))
        return {...res,data:app};
      }),
        catchError(throwResponse)
    );
  }

  @Get('findallbydoctorandstate/:id/:state')
  findAllByDoctorAndState(@Param('id') id: string, @Param('state') state: StateEnum) {
    return this.appointmentService.findAllByOwnerAndState({state: state, ownerType: 'Doctor', ownerId: id}).pipe(
      map(async (res) => {
        const {data:appointments} = res;
         const app = await Promise.all(appointments?.map(async (a: { patient: { patientId: string; }; }) => {
           const {data:patient} = await lastValueFrom(this.patientService.findOne(a.patient.patientId));
           return {...a,patient:{...a.patient,user:patient}}
         }))
        return {...res,data:app};
      }),
     catchError(throwResponse)
    );
  }

  @Get('findallbypatientandstate/:id/:state')
  findAllByPatientAndState(@Param('id') id: string, @Param('state') state: StateEnum) {
    return this.appointmentService.findAllByOwnerAndState({state: state, ownerType: 'Patient', ownerId: id}).pipe(
        tap((res) => console.log(res)),
        catchError(throwResponse)
    );
  }

  @Get('findallbydoctoranddate/:id/:date')
  findAllByDoctorAndDate(@Param('id') id: string, @Param('date') date: Date) {
    return this.appointmentService.findAllByOwnerAndDate({ownerId: id, ownerType: 'Doctor', date: date}).pipe(
      tap((res) => console.log(res)),
     catchError(throwResponse)
    );
  }

  @Get('findallbypatientanddate/:id/:date')
  findAllByPatientAndDate(@Param('id') id: string, @Param('date') date: Date) {
    return this.appointmentService.findAllByOwnerAndDate({ownerId: id, ownerType: 'Patient', date: date}).pipe(
        tap((res) => console.log(res)),
        catchError(throwResponse)
    );
  }

  @Get('findallbydoctoranddates/:id/:datedebut/:datefin')
  findAllByDoctorAndDates(@Param('id') id: string, @Param('datedebut') datedebut : Date, @Param('datefin') datefin: Date) {
    return this.appointmentService.findAllByOwnerAndDates({ownerId: id, ownerType: 'Doctor', startDate: datedebut, endDate: datefin}).pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse)
    );
  }

  @Get('findallbypatientanddates/:id/:datedebut/:datefin')
  findAllByPatientAndDates(@Param('id') id: string, @Param('datedebut') datedebut : Date, @Param('datefin') datefin: Date) {
    return this.appointmentService.findAllByOwnerAndDates({ownerId: id, ownerType: 'Patient', startDate: datedebut, endDate: datefin}).pipe(
        tap((res) => console.log(res)),
        catchError(throwResponse)
    );
  }

  @Get('findallbyownerandstateanddate')
  findAllByOwnerAndStateAndDate(@Query() payload: OwnerAndStateAndDate) {
    return this.appointmentService.findAllByOwnerAndStateAndDate(payload).pipe(
      tap((res) => console.log(res)),
     catchError(throwResponse)
    );
  }

  @Get('findallbyownerandstateanddates')
  findAllByOwnerAndStateAndDates(@Query() payload: OwnerAndStateAndDates) {
    return this.appointmentService.findAllByOwnerAndStateAndDates(payload).pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse)
    );
  }
}
