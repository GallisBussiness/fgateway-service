/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SCHEDULE_SERVICE',
        useFactory: async (config: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: config.get('SCHEDULE_SERVICE_HOST'),
              port: config.get('SCHEDULE_SERVICE_PORT'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ScheduleService],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
