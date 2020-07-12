import { Controller, Get, Res } from '@nestjs/common';

@Controller('persons')
export class PersonsController {

    @Get()
    getAll(@Res() res) {
        res.json({
            key: 1,
            name: 'Bob',
            age: 30
        },
            {
                key: 2,
                name: 'Joe',
                age: 12
            },
            {
                key: 3,
                name: 'Maria',
                age: 23
            },
            {
                key: 4,
                name: 'Ed',
                age: 23
            },
            {
                key: 5,
                name: 'Juan',
                age: 23
            })
    }
}
