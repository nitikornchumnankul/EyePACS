import { IsOptional } from "class-validator";

export class UpdateTableDto {

    @IsOptional()
    yes?: boolean

    @IsOptional()
    cannot_grade?: boolean
}