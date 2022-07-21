import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1],
    );
  },
});

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'INFORMATION_SERVICE',
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('INFORMATION_SERVICE_HOST'),
            port: config.get('INFORMATION_SERVICE_PORT'),
          },
        }),

        inject: [ConfigService],
      },
    ]),
    MulterModule.register({
      storage,
    }),
  ],
  exports: [EventService],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
