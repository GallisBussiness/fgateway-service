import { Test, TestingModule } from '@nestjs/testing';
import { OwnpatientService } from './ownpatient.service';

describe('OwnpatientService', () => {
  let service: OwnpatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnpatientService],
    }).compile();

    service = module.get<OwnpatientService>(OwnpatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
