import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { hashFromRequest } from 'src/utils/hash-from-request';
import { CreateMedecinDto } from './dto/create-medecin.dto';
import { SmsDto } from './dto/SmsDto';
import { UpdateMedecinDto } from './dto/update-medecin.dto';

@Injectable()
export class MedecinService {
  constructor(@Inject('USER_SERVICE') private medecin: ClientProxy) {}

  async create(createMedecinDto: CreateMedecinDto) {
    createMedecinDto = await hashFromRequest(createMedecinDto);
    return this.medecin.send<ResponseServiceInterface, CreateMedecinDto>(
      'createMedecin',
      createMedecinDto,
    );
  }

  findAll() {
    return this.medecin.send<ResponseServiceInterface>('findAllMedecin', '');
  }

  findByUserId(id: string) {
    return this.medecin.send<ResponseServiceInterface>(
      'findMedecinByUserId',
      id,
    );
  }

  findOne(id: string) {
    return this.medecin.send<ResponseServiceInterface, string>(
      'findOneMedecin',
      id,
    );
  }

  update(updateMedecinDto: UpdateMedecinDto) {
    return this.medecin.send<ResponseServiceInterface, UpdateMedecinDto>(
      'updateMedecin',
      updateMedecinDto,
    );
  }

  remove(id: string) {
    return this.medecin.send<ResponseServiceInterface, string>(
      'removeMedecin',
      id,
    );
  }

  sendSMS(smsDto: SmsDto) {
    return this.medecin.send<ResponseServiceInterface, SmsDto>(
      'sendSms',
      smsDto,
    );
  }

  search(searchTerm: string) {
    return this.medecin.send<ResponseServiceInterface, string>(
      'search',
      searchTerm,
    );
  }
}
