import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  })],
  controllers: [CatsController],
  providers: [],
})
export class AppModule { }
