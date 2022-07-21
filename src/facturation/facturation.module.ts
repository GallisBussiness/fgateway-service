import { Module } from '@nestjs/common';
import { FacturationService } from './facturation.service';
import { FacturationController } from './facturation.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientModule } from 'src/patient/patient.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FACTURATION_SERVICE',
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('FACTURATION_SERVICE_HOST'),
            port: config.get('FACTURATION_SERVICE_PORT'),
          },
        }),

        inject: [ConfigService],
      },
    ]),
    PatientModule,
  ],
  controllers: [FacturationController],
  providers: [FacturationService],
})
export class FacturationModule {}
