/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { BillDto } from '../dto/bill.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from '../../ResponseServiceInterface';

@Injectable()
export class BillService {
  constructor(
    @Inject('CONSULTATION_SERVICE') private readonly billProxy: ClientProxy,
  ) {}

  create(bill: BillDto) {
    return this.billProxy.send<ResponseServiceInterface, BillDto>(
      'createBill',
      bill,
    );
  }

  findAll() {
    return this.billProxy.send<ResponseServiceInterface, string>(
      'findAllBill',
      '',
    );
  }

  findOne(id: string) {
    return this.billProxy.send<ResponseServiceInterface, string>(
      'findOneBill',
      id,
    );
  }

  update(bill: BillDto) {
    return this.billProxy.send<ResponseServiceInterface, BillDto>(
      'updateBill',
      bill,
    );
  }

  remove(id: string) {
    return this.billProxy.send<ResponseServiceInterface, string>(
      'removeBill',
      id,
    );
  }
}
