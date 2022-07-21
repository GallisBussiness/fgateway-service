import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateOwnappointmentDto } from './dto/create-ownappointment.dto';
import { UpdateOwnappointmentDto } from './dto/update-ownappointment.dto';

@Injectable()
export class OwnappointmentService {
  constructor(
    @Inject('APPOINTMENT_SERVICE')
    private readonly ownappointmentProxy: ClientProxy,
  ) {}

  create(createOwnappointmentDto: CreateOwnappointmentDto) {
    return this.ownappointmentProxy.send<
      ResponseServiceInterface,
      CreateOwnappointmentDto
    >('createOwnappointment', createOwnappointmentDto);
  }

  findAll() {
    return this.ownappointmentProxy.send<ResponseServiceInterface, string>(
      'findAllOwnappointment',
      '',
    );
  }

  findOne(id: string) {
    return this.ownappointmentProxy.send<ResponseServiceInterface, string>(
      'findOneOwnappointment',
      id,
    );
  }

  update(id: string, updateOwnappointmentDto: UpdateOwnappointmentDto) {
    const o = { id, ...updateOwnappointmentDto };
    return this.ownappointmentProxy.send<
      ResponseServiceInterface,
      UpdateOwnappointmentDto
    >('updateOwnappointment', o);
  }

  remove(id: string) {
    return this.ownappointmentProxy.send<ResponseServiceInterface, string>(
      'removeOwnappointment',
      id,
    );
  }
}
