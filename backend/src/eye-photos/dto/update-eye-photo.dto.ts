import { IsOptional } from "class-validator"

export class UpdateEyePhotoDto{
    @IsOptional()
    comments?: String

    @IsOptional()
    remarks?: boolean

}