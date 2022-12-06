import { IsOptional } from "class-validator"

export class CreateTableHmaDto {

    @IsOptional()
    lower_2a?: boolean

    @IsOptional()
    upper_2a?: boolean

    @IsOptional()
    cannot_grade?: boolean
}