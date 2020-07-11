import { Controller, Get, Res } from '@nestjs/common';

@Controller('cats')
export class CatsController {


    @Get('/')
    getAll(@Res() response) {
        response.status(200);
        response.json({ cats: ['Misho', 'Napoleon'] })
    }



}
