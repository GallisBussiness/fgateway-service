/* eslint-disable prettier/prettier */
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  patientId: string;

  @IsString()
  doctorId: string;

  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
