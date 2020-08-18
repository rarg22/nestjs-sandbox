import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsAlpha} from 'class-validator';
import { IsPassword } from '../../../common/constraint/is-password.constraint';

export class SignUpReqDto {
    @ApiProperty({
        example: 'johndoe2020',
        description: "The user's username and secondary identity attribute",
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: 'john@doe',
        description: "The user's email and primary identity attribute",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'John',
        description: "The user's first name or given name",
    })
    @IsNotEmpty()
    @IsAlpha()
    firstName: string;

    @ApiProperty({
        example: 'Doe',
        description: "The user's last name or family name",
    })
    @IsNotEmpty()
    @IsAlpha()
    lastName: string;

    @ApiProperty({
        example: 'MySecr3tPassw0rd!',
        description: "The user's password",
    })
    @IsNotEmpty()
    @IsPassword()
    password: string;
}
