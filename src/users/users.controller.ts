import { Controller, Get, Param, Post, Body, Delete, Query, Put, Res, HttpStatus, HttpException, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filters';
import { SearchParams } from 'src/validation/SearchParams';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
// @UseFilters(new HttpExceptionFilter)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async getUsers(@Res() response) {
        try {
            const getAllUsers= await this.usersService.findAll();
            return response.status(HttpStatus.OK).json({ getAllUsers});
        } catch (err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    // @Get()
    // async getAllUser(){
    //     throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'This is a custom message',
    //       }, HttpStatus.FORBIDDEN);
    // }

    @Get(':userId')
    async getCourse(@Param('userId') userId) {
        try{
            const result = await this.usersService.readById(userId);
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
    async addUser(@Body() usersUserDto: CreateUserDto, @Res() response) {
        try {
            const createUser= await this.usersService.create(usersUserDto);
            return response.status(HttpStatus.OK).json(createUser);
        } catch (err) {
            throw new HttpException('CAN NOT CREATE!', HttpStatus.BAD_REQUEST);
        }
    }
    @Put('/:id')
    async update(@Res() response, @Param() params: SearchParams, @Body() UserDto: CreateUserDto) {
        try {
            const updatedCount = await this.usersService.update(params, UserDto);
            return response.status(HttpStatus.OK).json({
                updatedCount
            })
        } catch { throw new HttpException('CAN NOT UPDATE!', HttpStatus.BAD_REQUEST); }

    }

    @Delete('/:id')
    async deleteUser(@Param() params: 'id', @Res() response) {
        const delUsers = await this.usersService.delete(params)
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
