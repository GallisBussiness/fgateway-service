/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ConsultationDto } from '../dto/consultation.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from '../../ResponseServiceInterface';

@Injectable()
export class ConsultationService {
  constructor(
    @Inject('CONSULTATION_SERVICE')
    private readonly consultationProxy: ClientProxy,
  ) {}

  create(consultation: ConsultationDto) {
    return this.consultationProxy.send<
      ResponseServiceInterface,
      ConsultationDto
    >('createConsultation', consultation);
  }

  findAll() {
    return this.consultationProxy.send<ResponseServiceInterface, string>(
      'findAllConsultation',
      '',
    );
  }

  findOne(id: string) {
    return this.consultationProxy.send<ResponseServiceInterface, string>(
      'findOneconsultation',
      id,
    );
  }

  findByMedecin(id: string) {
    return this.consultationProxy.send<ResponseServiceInterface, string>(
      'findByMedecin',
      id,
    );
  }

  update(consultation: ConsultationDto) {
    return this.consultationProxy.send<
      ResponseServiceInterface,
      ConsultationDto
    >('updateConsultation', consultation);
  }

  remove(id: string) {
    return this.consultationProxy.send<ResponseServiceInterface, string>(
      'removeConsultation',
      id,
    );
  }
}
