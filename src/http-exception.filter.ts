/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';


const logger = new Logger('HttpCatch');

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost){
    logger.log(exception.message);
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    res.status(exception.getStatus()).send({message: exception.message, statusCode: exception.getStatus()});
  }
}
