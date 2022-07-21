import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { catchError } from 'rxjs';
import { throwResponse } from 'src/utils/throw-response';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const event = { ...createEventDto, image: file.filename };
    return this.eventService.create(event).pipe(catchError(throwResponse));
  }

  @Get()
  findAll() {
    return this.eventService.findAll().pipe(catchError(throwResponse));
  }

  @Get('findByMedecin/:id')
  findAllByMedecin(@Param('id') id: string) {
    return this.eventService
      .findAllByMedecin(id)
      .pipe(catchError(throwResponse));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id).pipe(catchError(throwResponse));
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService
      .update(id, updateEventDto)
      .pipe(catchError(throwResponse));
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id).pipe(catchError(throwResponse));
  }
}
