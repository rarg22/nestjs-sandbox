import { Controller, Post, Req, Body, Put, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/sign-up')
    async signUp(
        @Body()
        requestBody: {
            username: string;
            firstName: string;
            lastName: string;
            password: string;
            email: string;
        }
    ) {
        const { username, password, firstName, lastName, email } = requestBody;
        const result = await this.authService.registerUser({
            username,
            firstName,
            lastName,
            password,
            email,
        });
        return {
            data: result,
        };
    }

    @Post('/sign-in')
    async signIn(
        @Body()
        requestBody: {
            username: string;
            password: string;
        }
    ) {
        const { username, password } = requestBody;
        const result = await this.authService.authenticateUser({
            username,
            password
        });
        return {
            data: result,
        };
    }

    @Post('/verify')
    async verify(@Body() requestBody: {
        email: string,
        code: string
    }) {
        const { email, code } = requestBody;
        const result = await this.authService.verify(email, code);
        return { data: result }
    }

    @Post('/recovery/forgot-password')
    async forgotPassword(@Body() requestBody: {
        email: string
    }) {
        const { email } = requestBody;
        const result = await this.authService.forgotPassword(email);
        return { data: result }
    }

    @Put('/recovery/change-password')
    async changePasswordWithVerificationCode(@Body() requestBody: {
        code: string,
        newPassword: string,
        email: string
    }) {
        const { email, code, newPassword } = requestBody;
        const result = await this.authService.changePasswordWithVerificationCode(email, newPassword, code);
        return { data: result }
    }

    // @Get('/userdata')
    // async getSession(@Query('token') token) {
    //     const result = await this.cognitoService.getUser(token);
    //     return { data: result }
    // }
}
