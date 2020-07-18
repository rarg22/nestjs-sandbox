import { Controller, Get, Res } from '@nestjs/common';

@Controller('dogs')
export class DogsController {


    @Get()
    findAll(@Res() response) {
        response.status(200);
        response.json({ dogs: ['Lucy', 'Becky'] })
    }
}
