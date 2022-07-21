/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  Appointment,
  Owner,
  OwnerAndDate,
  OwnerAndState,
  OwnerAndDates,
  OwnerAndStateAndDate,
  OwnerAndStateAndDates,
} from './dto/appointment.dto';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENT_SERVICE')
    private readonly appointmentProxy: ClientProxy,
  ) {}
  /**
   * Cretae appointment
   * @param appointment
   * @returns
   */
  create(appointment: Appointment) {
    return this.appointmentProxy.send<ResponseServiceInterface, Appointment>(
      'create',
      appointment,
    );
  }
  /**
   *
   * @param payload
   * @returns
   */
  changeState(payload: { id: string; state: string }) {
    return this.appointmentProxy.send<
      ResponseServiceInterface,
      { id: string; state: string }
    >('changeState', payload);
  }
  /**
   *
   * @param appointment
   * @returns
   */
  reprogram(appointment: Appointment) {
    return this.appointmentProxy.send<ResponseServiceInterface, Appointment>(
      'reprogram',
      appointment,
    );
  }
  /**
   *
   * @param id
   * @returns
   */
  remove(id: string) {
    return this.appointmentProxy.send<ResponseServiceInterface, string>(
      'remove',
      id,
    );
  }
  /**
   *
   * @param id
   * @returns
   */
  findOne(id: string) {
    return this.appointmentProxy.send<ResponseServiceInterface, string>(
      'findOne',
      id,
    );
  }
  /**
   *
   * @returns
   */
  findAll() {
    return this.appointmentProxy.send<ResponseServiceInterface, string>(
      'findAll',
      '',
    );
  }
  /**
   *
   * @param state
   * @returns
   */
  findAllByState(state: string) {
    return this.appointmentProxy.send<ResponseServiceInterface, string>(
      'findAllByState',
      state,
    );
  }
  /**
   *
   * @param payload
   * @returns
   */
  findAllByOwner(payload: Owner) {
    return this.appointmentProxy.send<ResponseServiceInterface, Owner>(
      'findAllByOwner',
      payload,
    );
  }

  findAllByOwnerAndEmergency(id: string) {
    return this.appointmentProxy.send<ResponseServiceInterface, string>(
      'findAllByEmergency',
      id,
    );
  }
  /**
   *
   * @param payload
   * @returns
   */
  findAllByOwnerAndState(payload: OwnerAndState) {
    return this.appointmentProxy.send<ResponseServiceInterface, OwnerAndState>(
      'findAllByOwnerAndState',
      payload,
    );
  }
  /**
   *
   * @param payload
   * @returns
   */
  findAllByOwnerAndDate(payload: OwnerAndDate) {
    return this.appointmentProxy.send<ResponseServiceInterface, OwnerAndDate>(
      'findAllByOwnerAndDate',
      payload,
    );
  }
  /**
   *
   * @param payload
   * @returns
   */
  findAllByOwnerAndDates(payload: OwnerAndDates) {
    return this.appointmentProxy.send<ResponseServiceInterface, OwnerAndDates>(
      'findAllByOwnerAndDates',
      payload,
    );
  }
  /**
   *
   * @param payload
   * @returns
   */
  findAllByOwnerAndStateAndDate(payload: OwnerAndStateAndDate) {
    return this.appointmentProxy.send<
      ResponseServiceInterface,
      OwnerAndStateAndDate
    >('findAllByOwnerAndStateAndDate', payload);
  }
  /**
   *
   * @param payload
   * @returns
   */
  findAllByOwnerAndStateAndDates(payload: OwnerAndStateAndDates) {
    return this.appointmentProxy.send<
      ResponseServiceInterface,
      OwnerAndStateAndDates
    >('findAllByOwnerAndStateAndDates', payload);
  }
}
