import { Test, TestingModule } from '@nestjs/testing';
import { GestionsService } from './gestions.service';

describe('GestionsService', () => {
  let service: GestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionsService],
    }).compile();

    service = module.get<GestionsService>(GestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
