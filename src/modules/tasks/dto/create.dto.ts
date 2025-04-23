import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class CreateDto {
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title!: string;

    @IsBoolean({ message: 'Completed must be a boolean' })
    completed!: boolean;
}