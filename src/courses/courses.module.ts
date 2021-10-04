import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseSchema, Course } from './courses.schema';
import { LoggerMiddleware } from 'src/middlewares/logger.middlewares';

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .exclude({path: 'courses', method: RequestMethod.GET})
        .forRoutes(CoursesController);
    }
}
