import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {   
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop()
    email: string;

    @Prop()
    author: string;

    @Prop()
    amount: number;

    @Prop()
    url: string;
}


export const CourseSchema = SchemaFactory.createForClass(Course);