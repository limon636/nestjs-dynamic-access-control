import { IsString } from "class-validator";

export class CreateResourceDto {
    @IsString()
    controller: string;
    
    method: string;
    
    type: string;
}
