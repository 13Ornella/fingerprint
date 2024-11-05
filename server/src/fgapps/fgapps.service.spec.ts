import { Test, TestingModule } from '@nestjs/testing';
import { FgappsService } from './fgapps.service';

describe('FgappsService', () => {
  let service: FgappsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FgappsService],
    }).compile();

    service = module.get<FgappsService>(FgappsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
