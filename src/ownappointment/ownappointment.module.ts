import { Module } from '@nestjs/common';
import { OwnappointmentService } from './ownappointment.service';
import { OwnappointmentController } from './ownappointment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

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
  ],
  exports: [OwnappointmentService],
  controllers: [OwnappointmentController],
  providers: [OwnappointmentService],
})
export class OwnappointmentModule {}
