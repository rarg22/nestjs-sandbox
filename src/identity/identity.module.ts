import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
    exports: [IdentityService],
    imports: [AwsModule],
    providers: [IdentityService],
})
export class IdentityModule {}
