import { PartialType } from '@nestjs/mapped-types';
import { CreateMedecinDto } from './create-medecin.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateMedecinDto extends PartialType(CreateMedecinDto) {
  @IsOptional()
  @IsMongoId()
  id: string;
}
