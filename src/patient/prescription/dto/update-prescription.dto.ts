import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { CreatePrescriptionDto } from './create-prescription.dto';

export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {
  @IsString()
  @IsMongoId()
  @IsOptional()
  id?: string;
}
