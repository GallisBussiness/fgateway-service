/* eslint-disable prettier/prettier */
import { IsArray, IsString } from 'class-validator';

export class SmsDto {
  @IsString()
  id: string;

  @IsArray()
  tel: string[];

  @IsString()
  message: string;
}
