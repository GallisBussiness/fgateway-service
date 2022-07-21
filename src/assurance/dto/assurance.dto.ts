/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
export class AssuranceDto {
  @IsString()
  name: string;
}
