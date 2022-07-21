import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(@Inject('INFORMATION_SERVICE') private info: ClientProxy) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.info.send<ResponseServiceInterface, CreateNotificationDto>(
      'createNotification',
      createNotificationDto,
    );
  }

  markasread(id: string) {
    return this.info.send<ResponseServiceInterface, string>(
      'markAsReadNotification',
      id,
    );
  }

  findAll() {
    return this.info.send<ResponseServiceInterface, string>(
      'findAllNotifications',
      '',
    );
  }

  findAllByUser(id: string) {
    return this.info.send<ResponseServiceInterface, string>(
      'findAllNotificationsByUser',
      id,
    );
  }

  findOne(id: string) {
    return this.info.send<ResponseServiceInterface, string>(
      'findOneNotification',
      id,
    );
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const updatedNotification = { ...updateNotificationDto, id };
    return this.info.send<ResponseServiceInterface, UpdateNotificationDto>(
      'updateNotification',
      updatedNotification,
    );
  }

  remove(id: string) {
    return this.info.send<ResponseServiceInterface, string>(
      'removeNotification',
      id,
    );
  }
}
