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
import { StructureService } from './structure.service';
import { StructureDto } from './dto/structure.dto';

@Controller('structures')
export class StructureController {
  constructor(private readonly structureService: StructureService) {}

  @Post()
  create(@Body() structure: StructureDto) {
    return this.structureService.create(structure);
  }

  @Get()
  findAll() {
    return this.structureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.structureService.findOne(id);
  }

  @Patch()
  update(@Body() structure: StructureDto) {
    return this.structureService.update(structure);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.structureService.remove(id);
  }
}
