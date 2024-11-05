import { Test, TestingModule } from '@nestjs/testing';
import { PiecesJustificativesService } from './pieces-justificatives.service';

describe('PiecesJustificativesService', () => {
  let service: PiecesJustificativesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiecesJustificativesService],
    }).compile();

    service = module.get<PiecesJustificativesService>(PiecesJustificativesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
