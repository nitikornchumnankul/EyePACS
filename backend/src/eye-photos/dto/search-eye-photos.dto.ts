import { IsEnum, IsOptional } from "class-validator";
import { Status } from "src/enum/status.enum";
import { Sort } from "../enums/sort.enum";

export class SearchEyePhotosDto {

    @IsOptional()
    name?: string

    @IsOptional()
    @IsEnum(Status)
    status?: Status

    @IsOptional()
    @IsEnum(Sort)
    status_sort?: Sort

    @IsOptional()
    @IsEnum(Sort)
    date_sort?: Sort
    
    @IsOptional()
    @IsEnum(Sort)
    remarks_sort?: Sort
}