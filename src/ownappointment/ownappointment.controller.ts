import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OwnappointmentService } from './ownappointment.service';
import { CreateOwnappointmentDto } from './dto/create-ownappointment.dto';
import { UpdateOwnappointmentDto } from './dto/update-ownappointment.dto';

@Controller('ownappointment')
export class OwnappointmentController {
  constructor(private readonly ownappointmentService: OwnappointmentService) {}

  @Post()
  create(@Body() createOwnappointmentDto: CreateOwnappointmentDto) {
    return this.ownappointmentService.create(createOwnappointmentDto);
  }

  @Get()
  findAll() {
    return this.ownappointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownappointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOwnappointmentDto: UpdateOwnappointmentDto,
  ) {
    return this.ownappointmentService.update(id, updateOwnappointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownappointmentService.remove(id);
  }
}
