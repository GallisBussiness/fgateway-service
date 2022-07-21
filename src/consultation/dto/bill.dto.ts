/* eslint-disable prettier/prettier */
export interface BillDto {
  _id?: string;
  medecin?: string;
  patient?: string;
  assurance?: string;
  appointment_name?: string;
  amount_brute?: number;
  assurance_tpc?: number;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
