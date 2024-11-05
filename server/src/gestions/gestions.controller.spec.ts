import { Test, TestingModule } from '@nestjs/testing';
import { GestionsController } from './gestions.controller';
import { GestionsService } from './gestions.service';

describe('GestionsController', () => {
  let controller: GestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionsController],
      providers: [GestionsService],
    }).compile();

    controller = module.get<GestionsController>(GestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
