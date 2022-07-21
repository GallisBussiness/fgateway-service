/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { CreateOwnbillDto } from './create-ownbill.dto';

export class UpdateOwnbillDto extends PartialType(CreateOwnbillDto) {
  @IsMongoId()
  id: string;
}
