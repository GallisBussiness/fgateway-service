import { Test, TestingModule } from '@nestjs/testing';
import { OwnappointmentService } from './ownappointment.service';

describe('OwnappointmentService', () => {
  let service: OwnappointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnappointmentService],
    }).compile();

    service = module.get<OwnappointmentService>(OwnappointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
