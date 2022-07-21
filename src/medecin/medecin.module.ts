import { forwardRef, Module } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { MedecinController } from './medecin.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { EventModule } from 'src/event/event.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConsultationModule } from 'src/consultation/consultation.module';
import { ConfigService } from '@nestjs/config';
import { AbonnementModule } from 'src/abonnement/abonnement.module';
import { PaytechModule } from 'src/paytech/paytech.module';
import { MailModule } from 'src/mail/mail.module';
import { SmsModule } from 'src/sms/sms.module';
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
    ScheduleModule,
    EventModule,
    ConsultationModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    AbonnementModule,
    PaytechModule,
    MailModule,
    SmsModule,
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [MedecinController],
  providers: [MedecinService],
  exports: [MedecinService],
})
export class MedecinModule {}
