import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateFacturationDto } from './dto/create-facturation.dto';
import { CreateOwnbillDto } from './dto/create-ownbill.dto';

@Injectable()
export class FacturationService {
  constructor(
    @Inject('FACTURATION_SERVICE') private facturation: ClientProxy,
  ) {}
  create(
    createFacturationDto: CreateFacturationDto,
  ): Observable<ResponseServiceInterface> {
    return this.facturation.send<
      ResponseServiceInterface,
      CreateFacturationDto
    >('createFacturation', createFacturationDto);
  }

  createOwn(
    createFacturationDto: CreateOwnbillDto,
  ): Observable<ResponseServiceInterface> {
    return this.facturation.send<ResponseServiceInterface, CreateOwnbillDto>(
      'createOwnbill',
      createFacturationDto,
    );
  }

  findAll() {
    return `This action returns all facturation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facturation`;
  }

  findByMedecin(id: string): Observable<ResponseServiceInterface> {
    return this.facturation.send<ResponseServiceInterface, string>(
      'findFactureByMedecin',
      id,
    );
  }

  findOwnByMedecin(id: string): Observable<ResponseServiceInterface> {
    return this.facturation.send<ResponseServiceInterface, string>(
      'findOwnbillByMedecin',
      id,
    );
  }

  findAssuredByMedecin(id: string): Observable<ResponseServiceInterface> {
    return this.facturation.send<ResponseServiceInterface, string>(
      'findAssuredByMedecin',
      id,
    );
  }
}
