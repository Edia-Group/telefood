import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateGlovoDto {
    @IsString()
    carl: string;

}
