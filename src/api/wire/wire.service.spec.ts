import { Test, TestingModule } from '@nestjs/testing';
import { WireService } from './wire.service';

describe('WireService', () => {
  let service: WireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WireService],
    }).compile();

    service = module.get<WireService>(WireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
