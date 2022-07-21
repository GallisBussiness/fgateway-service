import { Module } from '@nestjs/common';
import { OwnpatientService } from './ownpatient.service';
import { OwnpatientController } from './ownpatient.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('USER_SERVICE_HOST'),
            port: config.get('USER_SERVICE_PORT'),
          },
        }),

        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OwnpatientController],
  providers: [OwnpatientService],
})
export class OwnpatientModule {}
