import { Test, TestingModule } from '@nestjs/testing';
import { PiecesJustificativesController } from './pieces-justificatives.controller';
import { PiecesJustificativesService } from './pieces-justificatives.service';

describe('PiecesJustificativesController', () => {
  let controller: PiecesJustificativesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiecesJustificativesController],
      providers: [PiecesJustificativesService],
    }).compile();

    controller = module.get<PiecesJustificativesController>(PiecesJustificativesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
