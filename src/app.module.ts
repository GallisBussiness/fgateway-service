/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MedecinModule } from './medecin/medecin.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppointmentModule } from './appointment/appointment.module';
import { EventModule } from './event/event.module';
import { NotificationsModule } from './notifications/notifications.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { RcpExceptionFilter } from './rcp-exception.filter';
import { PatientModule } from './patient/patient.module';
import { ConsultationModule } from './consultation/consultation.module';
import { PrescriptionModule } from './patient/prescription/prescription.module';
import { FacturationModule } from './facturation/facturation.module';
import { OwnpatientModule } from './ownpatient/ownpatient.module';
import { ConfigModule } from '@nestjs/config';
import { AssuranceModule } from './assurance/assurance.module';
import { AbonnementModule } from './abonnement/abonnement.module';
import { PaytechModule } from './paytech/paytech.module';
import { SmsModule } from './sms/sms.module';
import { MailModule } from './mail/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OwnappointmentModule } from './ownappointment/ownappointment.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MedecinModule,
    ScheduleModule,
    AppointmentModule,
    EventModule,
    NotificationsModule,
    PatientModule,
    ConsultationModule,
    PrescriptionModule,
    FacturationModule,
    OwnpatientModule,
    AssuranceModule,
    AbonnementModule,
    PaytechModule,
    SmsModule,
    MailModule,
    EventEmitterModule.forRoot(),
    OwnappointmentModule
  ],
  providers: [
   {
     provide: APP_FILTER,
     useClass: HttpExceptionFilter
   },
   {
     provide: APP_FILTER,
     useClass: RcpExceptionFilter
   },
  ],
})
export class AppModule {}
