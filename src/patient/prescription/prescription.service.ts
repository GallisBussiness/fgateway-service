import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Owner } from 'src/OwnerInterface';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateNoteDto } from './dto/create-note.dto';
import { CreateOwnPrescriptionDto } from './dto/create-owprescription.dto';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionService {
  constructor(
    @Inject('PRESCRIPTION_SERVICE') private prescription: ClientProxy,
  ) {}

  create(createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescription.send<
      ResponseServiceInterface,
      CreatePrescriptionDto
    >('createPrescription', createPrescriptionDto);
  }

  createOwn(createOwnPrescriptionDto: CreateOwnPrescriptionDto) {
    return this.prescription.send<
      ResponseServiceInterface,
      CreateOwnPrescriptionDto
    >('createOwnprescription', createOwnPrescriptionDto);
  }

  createNote(createNoteDto: CreateNoteDto) {
    return this.prescription.send<ResponseServiceInterface, CreateNoteDto>(
      'createNote',
      createNoteDto,
    );
  }

  findNoteByIdPatient(id: string) {
    return this.prescription.send<ResponseServiceInterface, string>(
      'findNoteByIdPatient',
      id,
    );
  }
  findNoteByIdMedecin(id: string) {
    return this.prescription.send<ResponseServiceInterface, string>(
      'findNoteByIdMedecin',
      id,
    );
  }

  findAll() {
    return this.prescription.send<ResponseServiceInterface, string>(
      'findAllPrescription',
      '',
    );
  }

  findAllByMedecin(id: string) {
    return this.prescription.send<ResponseServiceInterface, string>(
      'findAllOwnprescriptionByMedecin',
      id,
    );
  }

  findAllByOwner(owner: Owner) {
    return this.prescription.send<ResponseServiceInterface, Owner>(
      'findAllPrescriptionByOwner',
      owner,
    );
  }

  findOne(id: string) {
    return this.prescription.send<ResponseServiceInterface, string>(
      'findOnePrescription',
      id,
    );
  }

  update(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    const obj = { ...updatePrescriptionDto, id };
    return this.prescription.send<
      ResponseServiceInterface,
      UpdatePrescriptionDto
    >('updatePrescription', obj);
  }

  remove(id: string) {
    return this.prescription.send<ResponseServiceInterface, string>(
      'removePrescription',
      id,
    );
  }
}
