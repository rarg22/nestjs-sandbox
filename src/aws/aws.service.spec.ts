import { Test, TestingModule } from '@nestjs/testing';
import { AWSService } from './aws.service';
import { ConfigService } from '@nestjs/config';

describe('AwsService', () => {
  let service: AWSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AWSService, ConfigService],
    }).compile();

    service = module.get<AWSService>(AWSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
