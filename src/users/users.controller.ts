import { Controller, Post, HttpCode, Body, BadRequestException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUp, SignIn } from './usecase';
import { SignUpReqDto, SignInReqDto } from './dto/request';
import { SignInResDto } from './dto/response';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    private readonly signUp: SignUp;
    private readonly signIn: SignIn;

    constructor(signUp: SignUp, signIn: SignIn) {
        this.signIn = signIn;
        this.signUp = signUp;
    }

    @Post('/sign-up')
    @HttpCode(201)
    async postSignUp(@Body() requestBody: SignUpReqDto) {
        try {
            const { email, username, firstName, lastName, password } = requestBody;
            await this.signUp.start({
                email,
                username,
                firstName,
                lastName,
                password,
            });
        } catch (err) {
            const { code: errorCode, message } = err;
            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message,
                errorCode,
            });
        }
    }

    @Post('/sign-in')
    @HttpCode(200)
    async postSignIn(@Body() requestBody: SignInReqDto): Promise<SignInResDto> {
        try {
            const { email, password } = requestBody;
            const session = await this.signIn.start({ email, password });
            return {
                data: session,
            };
        } catch (err) {
            const { code: errorCode, message } = err;
            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message,
                errorCode,
            });
        }
    }
}
