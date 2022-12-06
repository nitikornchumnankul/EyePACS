import { IsOptional } from "class-validator"

export class CreateTableHeDto {

    @IsOptional()
    lower_2DD?: boolean

    @IsOptional()
    lower_1DD?: boolean

    @IsOptional()
    cannot_grade?: boolean
}