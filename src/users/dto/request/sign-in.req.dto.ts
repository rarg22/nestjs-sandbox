import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SignInReqDto {
    @ApiProperty({
        example: 'john@doe',
        description: "The user's email and primary identity attribute",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'MySecr3tPassw0rd!',
        description: "The user's password",
    })
    password: string;
}
