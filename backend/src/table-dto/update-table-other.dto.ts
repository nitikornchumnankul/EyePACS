import { IsOptional } from "class-validator"

export class UpdateTableOtherDto {

    @IsOptional()
    value?: number
}