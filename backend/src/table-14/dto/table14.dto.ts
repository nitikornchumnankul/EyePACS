import { IsNotEmpty } from "class-validator"

export class Table14Dto {
    
    @IsNotEmpty()
    value: number
}