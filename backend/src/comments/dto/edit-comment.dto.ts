import { IsOptional } from "class-validator";

export class EditCommentDto {

    @IsOptional()
    description?: string
}