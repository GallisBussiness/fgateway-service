import { IsISO8601, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  image?: string;

  @IsMongoId()
  medecinId: string;

  @IsISO8601()
  startAt: string;

  @IsISO8601()
  endAt: string;
}
