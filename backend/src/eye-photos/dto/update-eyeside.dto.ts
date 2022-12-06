import { IsNotEmpty } from "class-validator";

export class UpdateEyeSideDto {

    @IsNotEmpty()
    eyeside: number
}