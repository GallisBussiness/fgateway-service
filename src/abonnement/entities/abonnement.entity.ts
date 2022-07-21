import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class Pack {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  options: PackOption[];
}

export class PackOption {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
