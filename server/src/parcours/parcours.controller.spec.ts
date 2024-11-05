import { Test, TestingModule } from '@nestjs/testing';
import { ParcoursController } from './parcours.controller';
import { ParcoursService } from './parcours.service';

describe('ParcoursController', () => {
  let controller: ParcoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcoursController],
      providers: [ParcoursService],
    }).compile();

    controller = module.get<ParcoursController>(ParcoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
