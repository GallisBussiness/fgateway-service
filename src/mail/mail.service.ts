import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Patient } from 'src/appointment/dto/appointment.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any) {
    const url = `${user.verification_code}`;

    await this.mailerService.sendMail({
      to: user.username,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Bienvenue à Freedocteur! Confirmer votre compte svp!!',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        url,
      },
    });
  }

  async sendUserWelcome(user: any) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bienvenue chez Freedocteur !',
      template: 'welcome',
      context: user,
    });
  }

  async sendUserNotification(user: any, message: string, subject: string) {
    await this.mailerService.sendMail({
      to: user.username,
      // from: '"Support Team" <support@example.com>', // override default from
      subject,
      template: 'notification', // `.hbs` extension is appended automatically
      context: { message },
    });
  }

  async sendMail(to: string, message: string, subject: string) {
    try {
      return await this.mailerService.sendMail({
        to,
        // from: '"Support Team" <support@example.com>', // override default from
        subject,
        template: 'mail', // `.hbs` extension is appended automatically
        context: { message },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendMailRdvConfirmed(patient: Patient) {
    try {
      return await this.mailerService.sendMail({
        to: patient.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Rendez-vous confirmé',
        template: 'rdvconfirme', // `.hbs` extension is appended automatically
        context: patient,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
