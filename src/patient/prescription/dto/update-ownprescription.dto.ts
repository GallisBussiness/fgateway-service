/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { CreateOwnPrescriptionDto } from './create-owprescription.dto';
export class UpdateOwnPrescriptionDto extends PartialType(
  CreateOwnPrescriptionDto,
) {
  @IsMongoId()
  id: string;
}
