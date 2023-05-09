import { IsUnique } from "src/user/IsUnique";
import { IsEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsUnique()
    username: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    lastName: string;

    roleId: number;
    
    @IsEmpty()
    isActive: boolean;
}
