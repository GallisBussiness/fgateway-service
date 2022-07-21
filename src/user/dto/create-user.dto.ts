import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
export enum TYPE_USER {
  MEDECIN = 'MEDECIN',
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN',
}

export enum STATUS_USER {
  ACTIVATE = 'ACTIVATE',
  DISABLED = 'DISABLED',
}

export enum ROLES {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  SECRETAIRE = 'SECRETAIRE',
  USER = 'USER',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEnum(TYPE_USER, { each: true })
  type_user: TYPE_USER;

  @IsOptional()
  @IsString()
  verification_code: string;

  @IsOptional()
  @IsString()
  resetPasswordToken: string;

  @IsOptional()
  @IsEnum(STATUS_USER, { each: true })
  status: STATUS_USER;

  @IsOptional()
  @IsEnum(ROLES, { each: true })
  role: ROLES;
}
