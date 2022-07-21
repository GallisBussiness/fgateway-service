/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { StructureDto } from './dto/structure.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from '../ResponseServiceInterface';

@Injectable()
export class StructureService {
  constructor(
    @Inject('STRUCTURE_SERVICE') private readonly structureProxy: ClientProxy,
  ) {}

  create(structure: StructureDto) {
    return this.structureProxy.send<ResponseServiceInterface, StructureDto>(
      'createStructure',
      structure,
    );
  }

  findAll() {
    return this.structureProxy.send<ResponseServiceInterface, string>(
      'findAllStructure',
      '',
    );
  }

  findOne(id: string) {
    return this.structureProxy.send<ResponseServiceInterface, string>(
      'findOneStructure',
      id,
    );
  }

  update(structure: StructureDto) {
    return this.structureProxy.send<ResponseServiceInterface, StructureDto>(
      'updateStructure',
      structure,
    );
  }

  remove(id: string) {
    return this.structureProxy.send<ResponseServiceInterface, string>(
      'removeStructure',
      id,
    );
  }
}
