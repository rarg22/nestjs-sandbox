import { Controller, Res, Post } from '@nestjs/common';

// dynamoose.aws.sdk.config.update({
//     accessKeyId: 'dqtmdh',
//     secretAccessKey: 'l6hjeb',
//     region: 'localhost',
// });

// dynamoose.aws.ddb.local();

@Controller('users')
export class UserController {
    @Post('/')
    async create(@Res() response) {
        try {
            response.status(200);
            response.send();
        } catch (err) {
            console.log(err);
            response.status(500);
            response.send();
        }
    }
}
