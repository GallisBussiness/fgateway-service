import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Pack } from '../entities/abonnement.entity';

export class CreateAbonnementDto {
  @IsMongoId()
  doctorId: string;

  @IsNumber()
  duree: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  price: number;

  @IsObject()
  pack: Pack;
}
