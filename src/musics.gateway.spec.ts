import { Test, TestingModule } from '@nestjs/testing';
import { MusicsGateway } from './musics.gateway';

describe('MusicsGateway', () => {
  let gateway: MusicsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicsGateway],
    }).compile();

    gateway = module.get<MusicsGateway>(MusicsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
