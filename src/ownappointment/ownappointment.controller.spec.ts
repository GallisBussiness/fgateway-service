import { Test, TestingModule } from '@nestjs/testing';
import { OwnappointmentController } from './ownappointment.controller';
import { OwnappointmentService } from './ownappointment.service';

describe('OwnappointmentController', () => {
  let controller: OwnappointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnappointmentController],
      providers: [OwnappointmentService],
    }).compile();

    controller = module.get<OwnappointmentController>(OwnappointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
