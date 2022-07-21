/* eslint-disable prettier/prettier */
import { BillController } from './controllers/bill.controller';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsultationService } from './services/consultation.service';
import { BillService } from './services/bill.service';
import { ConsultationController } from './controllers/consultation.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CONSULTATION_SERVICE',
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
           options: {
          host: config.get('CONSULTATION_SERVICE_HOST'),
          port: config.get('CONSULTATION_SERVICE_PORT'),
        }, 
        }),

        inject: [ConfigService]
      },
    ]),
  ],
  exports: [ConsultationService, BillService],
  controllers: [ConsultationController, BillController],
  providers: [ConsultationService, BillService],
})
export class ConsultationModule {}
