import { Test, TestingModule } from '@nestjs/testing';
import { ProfesseursService } from './professeurs.service';

describe('ProfesseursService', () => {
  let service: ProfesseursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesseursService],
    }).compile();

    service = module.get<ProfesseursService>(ProfesseursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
