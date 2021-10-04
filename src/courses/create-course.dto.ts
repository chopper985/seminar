import { IsEmail, Length, IsNotEmpty , IsInt} from 'class-validator';

export class CreateCourseDto {
    @IsNotEmpty()
    title: string;
    @Length(20, 200)
    description: string;
    author: string;
    @IsEmail()
    email:string;
    @IsInt()
    amount:number;
    url: string ;
}
// let course = new CreateCourseDto();
// validate(course).then(errors => {
//     if(errors.length > 0){
//         console.log('Validation failed. errors: ' , errors);
//     }
//     else{
//         console.log('Validation Succeed');
//     }
// })
// validateOrReject(course).catch(errors => {
//     console.log('Promise rejected (validation failed). Errors: ', errors);
//   })