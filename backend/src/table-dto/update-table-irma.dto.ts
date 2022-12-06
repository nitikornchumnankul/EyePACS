import { IsOptional } from "class-validator"

export class UpdateTableIrmaDto {
    
    @IsOptional()
    lower_8a?: boolean

    @IsOptional()
    upper_8a?: boolean

    @IsOptional()
    cannot_grade?: boolean
}