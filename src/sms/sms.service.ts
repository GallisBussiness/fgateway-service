import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map, mergeMap, Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable()
export class SmsService {
  constructor(private config: ConfigService, private http: HttpService) {}

  authenticate() {
    return this.http
      .post(
        'https://api.orange.com/oauth/v3/token',
        stringify({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            Authorization: this.config.get('SMS_AUTHORIZATION_HEADER'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(map((res) => res.data));
  }

  sendSms(recevers: string[], message: string): Observable<any> {
    return this.authenticate().pipe(
      mergeMap(({ access_token }) =>
        this.http.post(
          `https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B221${this.config.get(
            'SMS_FROM',
          )}/requests`,
          {
            outboundSMSMessageRequest: {
              address: recevers.map((r) => `tel:+221${r}`),
              senderAddress: `tel:+221${this.config.get('SMS_FROM')}`,
              senderName: 'Freedocteur',
              outboundSMSTextMessage: {
                message: `${message}`,
              },
            },
          },
          {
            headers: {
              ContentType: 'application/json',
              Authorization: 'Bearer ' + access_token,
            },
          },
        ),
      ),
    );
  }

  sendWelcome(user) {
    console.log(user);
    const mes =
      'Bonjour Nous vous remercions pour l&#39;intérêt que vous portez à Freedocteur. Toute l&#39;Equipe Freedocteur vous souhaite la bienvenue. Votre inscription a été bien prise en compte. Votre compte a en effet été activé aujourd&#39;hui.Vous pouvez dès à présent donnez des rendez-vous médicaux à vos patients. L&#39;équipe  Freedocteur. 00 221 78 171 51 52 / 00 221 77 357 56 61 contact@freedocteur.com';
    return lastValueFrom(this.sendSms([user.phoneNumber], mes));
  }
}
