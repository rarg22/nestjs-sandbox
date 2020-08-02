import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/')
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
}
