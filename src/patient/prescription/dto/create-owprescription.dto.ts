/* eslint-disable prettier/prettier */
import { IsArray, IsString } from 'class-validator';
import { InfoPrescription } from 'src/InfoPrescriptionInterface';

export class CreateOwnPrescriptionDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  doctorId: string;

  @IsArray()
  prescriptions: Array<InfoPrescription | null>;
}
