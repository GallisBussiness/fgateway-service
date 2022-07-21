import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OwnpatientService } from './ownpatient.service';
import { CreateOwnpatientDto } from './dto/create-ownpatient.dto';
import { UpdateOwnpatientDto } from './dto/update-ownpatient.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('ownpatient')
export class OwnpatientController {
  constructor(private readonly ownpatientService: OwnpatientService) {}

  @Post()
  create(@Body() createOwnpatientDto: CreateOwnpatientDto) {
    return this.ownpatientService.create(createOwnpatientDto);
  }

  @Get('findByMedecin/:id')
  findByMedecin(@Param('id') id: string) {
    return this.ownpatientService.findByMedecin(id);
  }

  @Get()
  findAll() {
    return this.ownpatientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownpatientService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOwnpatientDto: UpdateOwnpatientDto,
  ) {
    return this.ownpatientService.update({ id, ...updateOwnpatientDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownpatientService.remove(id);
  }
}
