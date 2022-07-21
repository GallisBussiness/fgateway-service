/* eslint-disable prettier/prettier */
import { StateEnum } from 'src/utils/enums/StateEnum';
export interface Appointment {
  _id?: string | null;
  date: Date;
  title: string;
  startTime: string;
  endTime: string;
  state: StateEnum;
  type: 'PHYSICAL' | 'CALLING_VIDEO';
  doctorId: string;
  patient: Patient;
  isDelete?: boolean;
  emergency?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  structure: string;
}


export interface Patient {
  patientId: string;
  name: string;
  email?: string;
  phoneNumber: string;
  owner: string;
}


export interface Owner {
  ownerId: string;
  ownerType: 'Doctor' | 'Patient';
}

export interface OwnerAndDate extends Owner {
  date: Date;
}

export interface OwnerAndDates extends Owner {
  startDate: Date;
  endDate: Date;
}

export interface OwnerAndState extends Owner {
  state: 'PENDING' | 'CONFIRMED' | 'REPROGRAMMED' | 'CANCELLED' | 'PASTE';
}

export interface OwnerAndStateAndDate extends Owner {
  state: 'PENDING' | 'CONFIRMED' | 'REPROGRAMMED' | 'CANCELLED' | 'PASTE';
  date: Date;
}

export interface OwnerAndStateAndDates extends Owner {
  state: 'PENDING' | 'CONFIRMED' | 'REPROGRAMMED' | 'CANCELLED' | 'PASTE';
  startDate: Date;
  endDate: Date;
}
