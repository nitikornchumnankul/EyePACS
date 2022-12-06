import { IsOptional } from "class-validator";

export class CreateTableDto {

    @IsOptional()
    yes?: boolean

    @IsOptional()
    cannot_grade?: boolean
}