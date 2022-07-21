import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { catchError } from 'rxjs';
import { throwResponse } from 'src/utils/throw-response';
import { AuthGuard } from '@nestjs/passport';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService
      .create(createNotificationDto)
      .pipe(catchError(throwResponse));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('markasread/:id')
  markasread(@Param('id') id: string) {
    console.log(id);
    return this.notificationsService
      .markasread(id)
      .pipe(catchError(throwResponse));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.notificationsService.findAll().pipe(catchError(throwResponse));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('byuser/:id')
  findAllByUser(@Param('id') id: string) {
    return this.notificationsService
      .findAllByUser(id)
      .pipe(catchError(throwResponse));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService
      .findOne(id)
      .pipe(catchError(throwResponse));
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService
      .update(id, updateNotificationDto)
      .pipe(catchError(throwResponse));
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id).pipe(catchError(throwResponse));
  }
}
