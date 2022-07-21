import {
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  naissance?: string;

  @IsOptional()
  @IsNumber()
  poids?: number;

  @IsOptional()
  @IsNumber()
  taille?: number;

  @IsOptional()
  @IsString()
  groupe_sangin?: string;

  @IsOptional()
  @IsString()
  adresse: string;

  @IsOptional()
  @IsString()
  sexe: string;

  @IsOptional()
  @IsString()
  ville: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsObject()
  location: Location;
}

type Location = {
  lat: string;
  lng: string;
};
