/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { PatientModule } from 'src/patient/patient.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';
import { MedecinModule } from 'src/medecin/medecin.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'APPOINTMENT_SERVICE',
        useFactory: async (config: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: config.get('APPOINTMENT_SERVICE_HOST'),
              port: config.get('APPOINTMENT_SERVICE_PORT'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
    PatientModule,
    MedecinModule,
    NotificationsModule,
    UserModule
  ],
  exports: [AppointmentService],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
