/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StructureService } from './structure.service';
import { StructureController } from './structure.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
  ClientsModule.registerAsync([
      {
        name: 'STRUCTURE_SERVICE',
        useFactory: async (config: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: config.get('STRUCTURE_SERVICE_HOST'),
              port: config.get('STRUCTURE_SERVICE_PORT'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [StructureService],
  controllers: [StructureController],
  providers: [StructureService],
})
export class StructureModule {}
