import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Consultation } from 'src/ConsultationInterface';

export class CreateFacturationDto {
  @IsString()
  patientId: string;

  @IsOptional()
  @IsNumber()
  numero: number;

  @IsString()
  doctorId: string;

  @IsObject()
  @IsOptional()
  assurance: { name: string; value: number };

  @IsArray()
  consultations: Consultation[];

  @IsNumber()
  total: number;
}
