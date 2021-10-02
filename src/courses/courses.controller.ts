import { Controller, Get, Param, Post, Body, Delete, Query, Put, Res, HttpStatus } from '@nestjs/common';
import { SearchParams } from 'src/validation/SearchParams';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './create-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) { }

    @Get()
    async getCourses(@Res() response,) {
        const getAllCourse = await this.coursesService.findAll();
        return response.status(HttpStatus.OK).json({ getAllCourse })
    }

    @Get(':courseId')
    async getCourse(@Param('courseId') courseId, @Res() response) {
        const getCourse = await this.coursesService.readById(courseId);
        return response.status(HttpStatus.OK).json({ getCourse });
    }

    @Post()
    async addCourse(@Body() createCourseDto: CreateCourseDto, @Res() response) {
        const createCourse = await this.coursesService.create(createCourseDto);
        return response.status(HttpStatus.OK).json(createCourse);
    }
    @Put('/:id')
    async update(@Res() response, @Param() params: SearchParams, @Body() CourseDto: CreateCourseDto) {
        const updatedCount = await this.coursesService.update(params, CourseDto);
        return response.status(HttpStatus.OK).json({
            updatedCount
        })
    }

    @Delete('/:id')
    async deleteCourse(@Param() params: 'id', @Res() response) {
        const delCourses = await this.coursesService.delete(params);
        return response.status(HttpStatus.OK).json(delCourses);
    }
}

