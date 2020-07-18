import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CatsController } from './cats/cats.controller';
import { AppController } from './app.controller';
import { PersonsController } from './persons/persons.controller';
import { DogsController } from './dogs/dogs.controller';

@Module({
  imports: [],
  controllers: [CatsController, AppController, PersonsController, DogsController],
  providers: [],
})
export class AppModule { }
