import { IsMongoId, IsObject, IsString } from 'class-validator';

export class CreateOwnappointmentDto {
  @IsObject()
  patient;
  @IsString()
  date: string;
  @IsString()
  title: string;
  @IsString()
  startTime: string;
  @IsString()
  endTime: string;
  @IsString()
  type: 'PHYSICAL' | 'CALLING_VIDEO';
  @IsMongoId()
  doctor: string;
}
