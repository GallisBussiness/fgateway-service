import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateOwnpatientDto } from './dto/create-ownpatient.dto';
import { UpdateOwnpatientDto } from './dto/update-ownpatient.dto';

@Injectable()
export class OwnpatientService {
  constructor(@Inject('USER_SERVICE') private patient: ClientProxy) {}

  async create(createPatientDto: CreateOwnpatientDto) {
    return this.patient.send<ResponseServiceInterface, CreateOwnpatientDto>(
      'createOwnpatient',
      createPatientDto,
    );
  }

  findByMedecin(id: string) {
    return this.patient.send<ResponseServiceInterface, string>(
      'findAllOwnpatientByMedecin',
      id,
    );
  }

  findAll() {
    return this.patient.send<ResponseServiceInterface>('findAllOwnpatient', '');
  }

  findOne(id: string) {
    return this.patient.send<ResponseServiceInterface, string>(
      'findOneOwnpatient',
      id,
    );
  }

  update(updatePatientDto: UpdateOwnpatientDto) {
    return this.patient.send<ResponseServiceInterface, UpdateOwnpatientDto>(
      'updateOwnpatient',
      updatePatientDto,
    );
  }

  remove(id: string) {
    return this.patient.send<ResponseServiceInterface, string>(
      'removeOwnpatient',
      id,
    );
  }
}
