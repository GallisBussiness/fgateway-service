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
import { AssuranceService } from './assurance.service';
import { AssuranceDto } from './dto/assurance.dto';

@Controller('assurances')
export class AssuranceController {
  constructor(private readonly assuranceService: AssuranceService) {}

  @Post()
  create(@Body() assurance: AssuranceDto) {
    return this.assuranceService.create(assurance);
  }

  @Get()
  findAll() {
    return this.assuranceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assuranceService.findOne(id);
  }

  @Patch()
  update(@Body() assurance: AssuranceDto) {
    return this.assuranceService.update(assurance);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assuranceService.remove(id);
  }
}
