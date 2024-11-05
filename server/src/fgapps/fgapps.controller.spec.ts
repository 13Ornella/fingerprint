import { Test, TestingModule } from '@nestjs/testing';
import { FgappsController } from './fgapps.controller';
import { FgappsService } from './fgapps.service';

describe('FgappsController', () => {
  let controller: FgappsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FgappsController],
      providers: [FgappsService],
    }).compile();

    controller = module.get<FgappsController>(FgappsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
