import { Injectable, HttpException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './courses.schema';


@Injectable()
export class CoursesService {
    constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

    async create(course: Course): Promise<Course> {
      const createdCourse = new this.courseModel(course);
      return createdCourse.save();
    }
  
    async findAll(): Promise<Course[]> {
      return this.courseModel.find().exec();
    }

    async update(id,course: Course): Promise<Course> {
        return await this.courseModel.findByIdAndUpdate(id, course, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.courseModel.findByIdAndRemove(id);
    }
    
    async readById(id): Promise<Course> {
        return await this.courseModel.findById(id).exec();
    }


}