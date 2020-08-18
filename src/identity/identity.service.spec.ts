import { Test, TestingModule } from '@nestjs/testing';
import { IdentityService } from './identity.service';
import { AWSService } from './../aws/aws.service';
import { AwsModule } from './../aws/aws.module';
import { ConfigService } from '@nestjs/config';

describe('IdentityService', () => {
    let service: IdentityService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AwsModule],
            providers: [IdentityService, AWSService, ConfigService],
        }).compile();

        service = module.get<IdentityService>(IdentityService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
