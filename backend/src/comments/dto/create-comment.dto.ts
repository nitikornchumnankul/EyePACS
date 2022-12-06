import { IsOptional } from "class-validator";

export class CreateCommentDto {

    @IsOptional()
    description?: string
}