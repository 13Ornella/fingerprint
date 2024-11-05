import { Test, TestingModule } from '@nestjs/testing';
import { EtudiantsController } from './etudiants.controller';
import { EtudiantsService } from './etudiants.service';

describe('EtudiantsController', () => {
  let controller: EtudiantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtudiantsController],
      providers: [EtudiantsService],
    }).compile();

    controller = module.get<EtudiantsController>(EtudiantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
