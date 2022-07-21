import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(@Inject('INFORMATION_SERVICE') private info: ClientProxy) {}

  create(createEventDto: CreateEventDto) {
    return this.info.send<ResponseServiceInterface, CreateEventDto>(
      'createEvent',
      createEventDto,
    );
  }

  findAll() {
    return this.info.send<ResponseServiceInterface, string>(
      'findAllEvents',
      '',
    );
  }

  findAllByMedecin(id: string) {
    return this.info.send<ResponseServiceInterface, string>(
      'findAllEventsByMedecin',
      id,
    );
  }

  findOne(id: string) {
    return this.info.send<ResponseServiceInterface, string>('findOneEvent', id);
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    const updatedEvent = { ...updateEventDto, id };
    return this.info.send<ResponseServiceInterface, UpdateEventDto>(
      'updateEvent',
      updatedEvent,
    );
  }

  remove(id: string) {
    return this.info.send<ResponseServiceInterface, string>('removeEvent', id);
  }
}
