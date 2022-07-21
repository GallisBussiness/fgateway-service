import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsOptional } from 'class-validator';
import { CreateOwnappointmentDto } from './create-ownappointment.dto';

export class UpdateOwnappointmentDto extends PartialType(
  CreateOwnappointmentDto,
) {
  @IsOptional()
  @IsMongoId()
  id: string;
}
