/* eslint-disable prettier/prettier */
import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Consultation } from 'src/ConsultationInterface';

export class CreateOwnbillDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsOptional()
  @IsNumber()
  numero?: number;

  @IsString()
  phoneNumber: string;

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
