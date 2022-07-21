/* eslint-disable prettier/prettier */
export interface Schedule {
  _id: string | null;
  isDelete?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  slots?: Slot[];
  doctorId: string;
}

export interface Hour {
  _id: string | null;
  startTime: string;
  endTime: string;
  isDelete?: boolean;
  isActive?: boolean;
}

export interface Slot {
  _id: string | null;
  isDelete?: boolean;
  isActive?: boolean;
  dayName: string;
  hours: Hour[];
}

export interface IPaginate {
  page?: number;
  limit?: number;
  search: string;
}

export interface UpdatingSlots{
  id: string;
  slots: Slot[];
}