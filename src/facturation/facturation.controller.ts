import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FacturationService } from './facturation.service';
import { CreateFacturationDto } from './dto/create-facturation.dto';
import { lastValueFrom, map } from 'rxjs';
import { PatientService } from 'src/patient/patient.service';
import { CreateOwnbillDto } from './dto/create-ownbill.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('facturation')
export class FacturationController {
  constructor(
    private readonly facturationService: FacturationService,
    private readonly patientService: PatientService,
  ) {}

  @Post()
  create(@Body() createFacturationDto: CreateFacturationDto) {
    return this.facturationService.create(createFacturationDto);
  }

  @Post('own')
  createOwn(@Body() createFacturationDto: CreateOwnbillDto) {
    return this.facturationService.createOwn(createFacturationDto);
  }

  @Get()
  findAll() {
    return this.facturationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturationService.findOne(+id);
  }

  @Get('findByMedecin/:id')
  findByMedecin(@Param('id') id: string) {
    return this.facturationService.findByMedecin(id).pipe(
      map(async (res) => {
        const { data: factures } = res;
        const app = await Promise.all(
          factures?.map(async (f) => {
            const { patientId } = f;
            const { data: patient } = await lastValueFrom(
              this.patientService.findOne(patientId),
            );
            return { ...f, patient: { ...patient } };
          }),
        );
        return { ...res, data: app };
      }),
    );
  }

  @Get('findOwnByMedecin/:id')
  findOwnByMedecin(@Param('id') id: string) {
    return this.facturationService.findOwnByMedecin(id);
  }

  @Get('findAssuredByMedecin/:id')
  findAssuredByMedecin(@Param('id') id: string) {
    return this.facturationService.findAssuredByMedecin(id);
  }
}
