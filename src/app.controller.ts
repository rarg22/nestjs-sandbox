import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/')
    getAll(@Res() response) {
        response.status(200);
        response.json({ message: "Welcome!" })
    }
}
