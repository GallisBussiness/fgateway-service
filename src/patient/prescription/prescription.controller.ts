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
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { UserType } from 'src/OwnerInterface';
import { lastValueFrom, map } from 'rxjs';
import { PatientService } from 'src/patient/patient.service';
import { CreateOwnPrescriptionDto } from './dto/create-owprescription.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { MedecinService } from 'src/medecin/medecin.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('prescription')
export class PrescriptionController {
  constructor(
    private readonly prescriptionService: PrescriptionService,
    private readonly patientService: PatientService,
    private readonly medecinService: MedecinService,
  ) {}

  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Post('own')
  createOwn(@Body() createOwnPrescriptionDto: CreateOwnPrescriptionDto) {
    console.log(createOwnPrescriptionDto);
    return this.prescriptionService.createOwn(createOwnPrescriptionDto);
  }

  @Post('note')
  createNote(@Body() createNoteDto: CreateNoteDto) {
    console.log(createNoteDto);
    return this.prescriptionService.createNote(createNoteDto);
  }

  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }
  @Get('own/:id')
  findAllByMdecin(@Param('id') id: string) {
    return this.prescriptionService.findAllByMedecin(id);
  }

  @Get('findnotebyidpatient/:id')
  findAllNoteByIdPatient(@Param('id') id: string) {
    return this.prescriptionService.findNoteByIdPatient(id).pipe(
      map(async (res) => {
        const { data: notes } = res;
        const n = await Promise.all(
          notes.map(async (note) => {
            const { data: medecin } = await lastValueFrom(
              this.medecinService.findOne(note.doctorId),
            );
            return { ...note, doctor: { ...medecin } };
          }),
        );
        return { ...res, data: n };
      }),
    );
  }

  @Get('findnotebyidmedecin/:id')
  findAllNoteByIdMedecin(@Param('id') id: string) {
    return this.prescriptionService.findNoteByIdMedecin(id);
  }

  @Get('findAllByOwner/:type/:id')
  findAllByOwner(@Param('id') id: string, @Param('type') type: string) {
    return this.prescriptionService
      .findAllByOwner({
        id,
        type: UserType.Doctor === type ? UserType.Doctor : UserType.Patient,
      })
      .pipe(
        map(async (res) => {
          const { data: prescriptions } = res;
          const app = await Promise.all(
            prescriptions?.map(async (f) => {
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }
}
