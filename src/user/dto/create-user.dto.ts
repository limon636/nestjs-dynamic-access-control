import { IsUnique } from "src/user/IsUnique";
import { IsEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  @IsUnique()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  @IsEmpty()
  isActive: boolean;
}
