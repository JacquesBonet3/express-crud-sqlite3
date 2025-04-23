import {IsBoolean, IsOptional, IsString} from 'class-validator';

export class UpdateDto {
    @IsString({ message: 'Title must be a string' })
    @IsOptional()
    title?: string;

    @IsBoolean({ message: 'Completed must be a boolean' })
    @IsOptional()
    completed?: boolean;
}