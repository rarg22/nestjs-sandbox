import { Module } from '@nestjs/common';
import { AWSService } from './aws.service';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [AWSService, ConfigService],
    exports: [AWSService],
})
export class AwsModule {}
