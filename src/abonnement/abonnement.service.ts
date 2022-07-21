import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { UpdateAbonnementDto } from './dto/update-abonnement.dto';

@Injectable()
export class AbonnementService {
  constructor(
    @Inject('PAIEMENT_SERVICE')
    private readonly abonnementProxy: ClientProxy,
  ) {}

  create(createAbonnementDto: CreateAbonnementDto) {
    return this.abonnementProxy.send<
      ResponseServiceInterface,
      CreateAbonnementDto
    >('createAbonnement', createAbonnementDto);
  }

  findAll() {
    return this.abonnementProxy.send<ResponseServiceInterface, string>(
      'findAllAbonnement',
      '',
    );
  }

  findOne(id: string) {
    return this.abonnementProxy.send<ResponseServiceInterface, string>(
      'findOneAbonnement',
      id,
    );
  }

  update(id: string, updateAbonnementDto: UpdateAbonnementDto) {
    updateAbonnementDto = { ...updateAbonnementDto, id };
    return this.abonnementProxy.send<
      ResponseServiceInterface,
      UpdateAbonnementDto
    >('updateAbonnement', updateAbonnementDto);
  }

  remove(id: string) {
    return this.abonnementProxy.send<ResponseServiceInterface, string>(
      'removeAbonnement',
      id,
    );
  }
}
