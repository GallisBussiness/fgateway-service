import { Test, TestingModule } from '@nestjs/testing';
import { OwnpatientController } from './ownpatient.controller';
import { OwnpatientService } from './ownpatient.service';

describe('OwnpatientController', () => {
  let controller: OwnpatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnpatientController],
      providers: [OwnpatientService],
    }).compile();

    controller = module.get<OwnpatientController>(OwnpatientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
