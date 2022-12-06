import { IsNotEmpty } from "class-validator"

export class Table15Dto {
    
    @IsNotEmpty()
    value: number
}
