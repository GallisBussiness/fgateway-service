import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateOwnpatientDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  sexe: string;

  @IsOptional()
  @IsString()
  adresse: string;

  @IsOptional()
  @IsString()
  ville: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsMongoId()
  doctorId: string;

  @IsOptional()
  @IsArray()
  variables?: Variables[];
}

interface Variables {
  nom: string;
  value: string;
}
