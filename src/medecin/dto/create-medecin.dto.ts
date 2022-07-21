import {
  IsArray,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Variables } from 'src/utils/Variables';

export class CreateMedecinDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  ville: string;

  @IsOptional()
  @IsString()
  abonnement: string;

  @IsOptional()
  @IsString()
  adresse: string;

  @IsOptional()
  @IsString()
  sexe: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  speciality: string;

  @IsOptional()
  @IsObject()
  location: Location;

  @IsOptional()
  @IsArray()
  variables?: Variables[];
}

type Location = {
  lat: string;
  lng: string;
};
