import { IsNotEmpty } from "class-validator"

export class CreateTableOtherDto {

    @IsNotEmpty()
    value: number
}