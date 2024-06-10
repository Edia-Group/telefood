import { Test, TestingModule } from '@nestjs/testing';
import { NhostService } from './nhost.service';

describe('NhostService', () => {
  let service: NhostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NhostService],
    }).compile();

    service = module.get<NhostService>(NhostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
