import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaytechService {
  constructor(private http: HttpService, private config: ConfigService) {}

  pay(data): Promise<any> {
    return lastValueFrom(
      this.http.post(
        'https://paytech.sn/api/payment/request-payment',
        JSON.stringify(data),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            API_KEY: this.config.get('PAYTECH_API_KEY'),
            API_SECRET: this.config.get('PAYTECH_API_SECRET'),
          },
        },
      ),
    )
      .then((d) => {
        return d.data;
      })
      .catch((e) => console.log(e));
  }
}
