import { Controller, Get, Param, Post, Body, Delete, Query, Put, Res, HttpStatus, HttpException, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filters';
import { SearchParams } from 'src/validation/SearchParams';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './create-course.dto';

@Controller('courses')
// @UseFilters(new HttpExceptionFilter)
export class CoursesController {
    constructor(private coursesService: CoursesService) { }

    @Get()
    async getCourses(@Res() response) {
        try {
            const getAllCourse = await this.coursesService.findAll();
            return response.status(HttpStatus.OK).json({ getAllCourse });
        } catch (err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    // @Get()
    // async getAllCourse(){
    //     throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'This is a custom message',
    //       }, HttpStatus.FORBIDDEN);
    // }

    @Get(':courseId')
    async getCourse(@Param('courseId') courseId) {
        try{
            const result = await this.coursesService.readById(courseId);
            if (result) {
                return result;
            }
            else {
                throw new HttpException('Not Found Id', HttpStatus.NOT_FOUND);
            }     
        }catch{
            throw new HttpException('Not Found Id', HttpStatus.NOT_FOUND);
        }
     
    }

    @Post()
    async addCourse(@Body() createCourseDto: CreateCourseDto, @Res() response) {
        try {
            const createCourse = await this.coursesService.create(createCourseDto);
            return response.status(HttpStatus.OK).json(createCourse);
        } catch (err) {
            throw new HttpException('CAN NOT CREATE!', HttpStatus.BAD_REQUEST);
        }
    }
    @Put('/:id')
    async update(@Res() response, @Param() params: SearchParams, @Body() CourseDto: CreateCourseDto) {
        try {
            const updatedCount = await this.coursesService.update(params, CourseDto);
            return response.status(HttpStatus.OK).json({
                updatedCount
            })
        } catch { throw new HttpException('CAN NOT UPDATE!', HttpStatus.BAD_REQUEST); }

    }

    @Delete('/:id')
    async deleteCourse(@Param('id') id) {
        const delCourses = await this.coursesService.delete(id)
            .then((result) => {
                if (result) {
                    return result;
                }
                else {
                    throw new HttpException('Not Found Id', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('Not Found Id', HttpStatus.NOT_FOUND);
            });
    }
}

// export class ForbiddenException extends HttpException {
//     constructor() {
//       super('Forbidden', HttpStatus.FORBIDDEN);
//     }
//   }
