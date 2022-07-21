import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientModule } from 'src/patient/patient.module';
import { ConfigService } from '@nestjs/config';
import { MedecinModule } from 'src/medecin/medecin.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PRESCRIPTION_SERVICE',
        useFactory: async (config: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: config.get('PRESCRIPTION_SERVICE_HOST'),
              port: config.get('PRESCRIPTION_SERVICE_PORT'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
    PatientModule,
    MedecinModule,
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}
