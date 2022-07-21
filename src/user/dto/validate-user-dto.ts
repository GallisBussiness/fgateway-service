/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
/* eslint-disable prettier/prettier */
export class ValidateUserDto {

  @IsString()
  verification_code: string;

  @IsString()
  id: string;
}
