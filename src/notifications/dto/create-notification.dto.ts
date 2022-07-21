import { IsMongoId, IsString, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  message: string;

  @IsMongoId()
  to: string;

  @IsBoolean()
  isRead: boolean;
}
