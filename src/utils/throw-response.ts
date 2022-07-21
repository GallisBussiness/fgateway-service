/* eslint-disable prettier/prettier */
import { HttpException } from '@nestjs/common';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';

export const throwResponse = (error: ResponseServiceInterface) => {
  throw new HttpException(error, error.statusCode);
};
