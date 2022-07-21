import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsOptional } from 'class-validator';
import { CreateAbonnementDto } from './create-abonnement.dto';

export class UpdateAbonnementDto extends PartialType(CreateAbonnementDto) {
  @IsOptional()
  @IsMongoId()
  id?: string;
}
