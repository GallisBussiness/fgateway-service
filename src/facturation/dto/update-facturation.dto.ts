import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateFacturationDto } from './create-facturation.dto';

export class UpdateFacturationDto extends PartialType(CreateFacturationDto) {
  @IsString()
  id: string;
}
