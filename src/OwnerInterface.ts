/* eslint-disable prettier/prettier */
export interface Owner {
    type: UserType;
    id: string;
  }
  
  export enum UserType {
    Patient = "Patient",
    Doctor = "Doctor"
  }
  