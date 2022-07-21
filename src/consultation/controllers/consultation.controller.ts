/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultationService } from '../services/consultation.service';
import { ConsultationDto } from '../dto/consultation.dto';
import { tap } from 'rxjs';

@Controller('consultations')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  create(@Body() consultation: ConsultationDto) {
    return this.consultationService.create(consultation);
  }

  @Get()
  findAll() {
    return this.consultationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  @Get('findconsultationbymedecin/:id')
  findConsultationByMedecin(@Param('id') id: string) {

    return this.consultationService.findByMedecin(id).pipe(tap(console.log));
  }

  @Patch(':id')
  update(@Param('id') id: string,@Body() consultation: ConsultationDto) {
    return this.consultationService.update({...consultation, _id:id});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(id);
  }
}
