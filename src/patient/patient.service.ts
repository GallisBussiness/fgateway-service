import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { hashFromRequest } from 'src/utils/hash-from-request';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(@Inject('USER_SERVICE') private patient: ClientProxy) {}

  async create(createPatientDto: CreatePatientDto) {
    createPatientDto = await hashFromRequest(createPatientDto);
    return this.patient.send<ResponseServiceInterface, CreatePatientDto>(
      'createPatient',
      createPatientDto,
    );
  }

  async regsiterUserFromGoogle(createUserDto: CreatePatientDto) {
    createUserDto = await hashFromRequest(createUserDto);
    return this.patient.send<ResponseServiceInterface, CreatePatientDto>(
      'registerUserFromGoogle',
      createUserDto,
    );
  }

  findByUserId(id: string) {
    console.log(id);
    return this.patient.send<ResponseServiceInterface>(
      'findPatientByUserId',
      id,
    );
  }

  findAll() {
    return this.patient.send<ResponseServiceInterface>('findAllPatient', '');
  }

  findOne(id: string) {
    return this.patient.send<ResponseServiceInterface, string>(
      'findOnePatient',
      id,
    );
  }

  update(updatePatientDto: UpdatePatientDto) {
    return this.patient.send<ResponseServiceInterface, UpdatePatientDto>(
      'updatePatient',
      updatePatientDto,
    );
  }

  remove(id: string) {
    return this.patient.send<ResponseServiceInterface, string>(
      'removePatient',
      id,
    );
  }
}
