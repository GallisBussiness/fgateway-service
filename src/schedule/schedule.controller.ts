/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule, Slot, IPaginate, Hour, UpdatingSlots } from './dto/schedule.dto';
import { tap, map, catchError } from 'rxjs';
import { throwResponse } from 'src/utils/throw-response';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() schedule: Schedule) {
    return this.scheduleService.create(schedule).pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse),
    );
  }

  @Patch()
  update(@Body() updatingSlots: UpdatingSlots) {
    return this.scheduleService.update(updatingSlots).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError(throwResponse)
    );
  }

  @Delete('toggleActive/:id')
  toggleActive(@Param('id') id: string) {
    return this.scheduleService.toggleActive(id).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError(throwResponse)
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError(throwResponse)
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id).pipe(
      tap((res) => {
        console.log(res);
      }),
     catchError(throwResponse)
    );
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll().pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse)
    );
  }

  @Get('paginate')
  paginate(@Query() query: IPaginate) {
    return this.scheduleService.paginate(query).pipe(
      tap((res) => console.log(res)),
      catchError(throwResponse)
    );
  }

  @Get('/slot-doctor/:id')
  findOneByDoctor(@Param('id') id: string) {
    return this.scheduleService.findOneByDoctor(id).pipe(
      tap((res) => console.log(res)),
      map((res) => {
        return res;
      }),
    );
  }

  @Get('/slots-doctor/:id')
  findAllSlotsByDoctor(@Param('id') doctorId: string) {
    console.log(doctorId);
    return this.scheduleService.findAllSlotsByDoctor(doctorId).pipe(
      tap((res) => {
        console.log('resulttat')
        //console.log(res);
      }),
     catchError(throwResponse)
    );
  }

  @Post('slot-add')
  addSlot(@Body() data: { id: string; slot: Slot }) {
    return this.scheduleService.addSlot(data).pipe(
      tap((res) => {
        console.log(res);
      }),
     catchError(throwResponse)
    );
  }

  @Patch('slot-remove')
  removeSlot(@Body() payload: { id: string; slotId: string }) {
    return this.scheduleService.removeSlot(payload).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError(throwResponse)
    );
  }

  @Patch('slots-toggle-active')
  toggleActiveSlot(@Body() payload: { id: string; slotId: string }) {
    return this.toggleActiveSlot(payload).pipe(
      tap((res) => {
        console.log(res);
      }),
     catchError(throwResponse)
    );
  }

  @Post('hour-slot-add')
  addHourToSlot(@Body() payload: { id: string; day: string; hour: Hour }) {
    return this.addHourToSlot(payload).pipe(
      tap((res) => {
        console.log(res);
      }),
     catchError(throwResponse)
    );
  }

  @Patch('hour-slot-remove')
  removeHourSlot(
    @Body() payload: { id: string; slotId: string; hourId: string },
  ) {
    this.scheduleService.removeHourSlot(payload).pipe(
      tap((res) => {
        console.log(res);
      }),
     catchError(throwResponse)
    );
  }

  @Patch('hour-toggle-active')
  toggleActiveHourSlot(
    @Body() payload: { id: string; slotId: string; hourId: string },
  ) {
    return this.toggleActiveHourSlot(payload).pipe(
      tap((res) => {
        console.log(res);
      }),
     catchError(throwResponse)
    );
  }
}
