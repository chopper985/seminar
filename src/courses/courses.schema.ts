import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, Length, IsNotEmpty } from 'class-validator';

export type CourseDocument = Course & Document;

@Schema()
export class Course {   
    @IsNotEmpty()
    title: string;

    @Length(20, 200)
    description: string;

    @IsEmail()
    email: string;

    @Prop()
    author: string;

    @Prop()
    amount: number;

    @Prop()
    url: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);