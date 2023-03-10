import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class UpdateNewsDto {
    @ApiPropertyOptional({type:String})
    @IsString()
    @IsOptional()
    title: string;

    @ApiPropertyOptional({type:String})
    @IsString({
        message:'Поле description должно быть строкой'
    })
    @IsOptional()
    description: string;

    @ApiPropertyOptional({type:String})
    @IsString()
    @IsOptional()
    author: string;

}
