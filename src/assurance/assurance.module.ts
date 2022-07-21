/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AssuranceService } from './assurance.service';
import { AssuranceController } from './assurance.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FACTURATION_SERVICE',
        useFactory: async (config: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: config.get('FACTURATION_SERVICE_HOST'),
              port: config.get('FACTURATION_SERVICE_PORT'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [AssuranceService],
  controllers: [AssuranceController],
  providers: [AssuranceService],
})
export class AssuranceModule {}
