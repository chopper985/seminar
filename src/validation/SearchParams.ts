import { IsNumberString } from "class-validator";

export class SearchParams {
    @IsNumberString()
    id: number;
}