/* eslint-disable prettier/prettier */
import { IsArray, IsString } from 'class-validator';
import { InfoPrescription } from 'src/InfoPrescriptionInterface';

export class CreatePrescriptionDto {
    @IsString()
    patientId: string;
  
    @IsString()
    doctorId: string;
  
    @IsArray()
    prescriptions: Array<InfoPrescription | null>;
}
