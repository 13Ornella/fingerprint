import { Test, TestingModule } from '@nestjs/testing';
import { MatieresController } from './matieres.controller';
import { MatieresService } from './matieres.service';

describe('MatieresController', () => {
  let controller: MatieresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatieresController],
      providers: [MatieresService],
    }).compile();

    controller = module.get<MatieresController>(MatieresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
