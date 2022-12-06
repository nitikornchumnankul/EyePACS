import { IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "src/enum/status.enum";

export class UpdateEyeStatusDto {

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status
}