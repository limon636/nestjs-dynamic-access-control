import { IsNumber } from "class-validator";

export class CreatePolicyDto {
    @IsNumber()
    roleId: number;

    @IsNumber()
    resourceId: number;
}
