/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { AssuranceDto } from './dto/assurance.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from '../ResponseServiceInterface';

@Injectable()
export class AssuranceService {
  constructor(
    @Inject('FACTURATION_SERVICE') private readonly assuranceProxy: ClientProxy,
  ) {}

  create(assurance: AssuranceDto) {
    return this.assuranceProxy.send<ResponseServiceInterface, AssuranceDto>(
      'createAssurance',
      assurance,
    );
  }

  findAll() {
    return this.assuranceProxy.send<ResponseServiceInterface, string>(
      'findAllAssurance',
      '',
    );
  }

  findOne(id: string) {
    return this.assuranceProxy.send<ResponseServiceInterface, string>(
      'findOneAssurance',
      id,
    );
  }

  update(assurance: AssuranceDto) {
    return this.assuranceProxy.send<ResponseServiceInterface, AssuranceDto>(
      'updateAssurance',
      assurance,
    );
  }

  remove(id: string) {
    return this.assuranceProxy.send<ResponseServiceInterface, string>(
      'removeAssurance',
      id,
    );
  }
}
