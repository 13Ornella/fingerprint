import { Test, TestingModule } from '@nestjs/testing';
import { ProfesseursController } from './professeurs.controller';
import { ProfesseursService } from './professeurs.service';

describe('ProfesseursController', () => {
  let controller: ProfesseursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesseursController],
      providers: [ProfesseursService],
    }).compile();

    controller = module.get<ProfesseursController>(ProfesseursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
