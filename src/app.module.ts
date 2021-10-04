import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CoursesModule,UsersModule,MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_nestjs')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
