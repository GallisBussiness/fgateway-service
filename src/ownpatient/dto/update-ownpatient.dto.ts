import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { CreateOwnpatientDto } from './create-ownpatient.dto';

export class UpdateOwnpatientDto extends PartialType(CreateOwnpatientDto) {
  @IsMongoId()
  id: string;
}
