import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateResourceDto {
  @ApiProperty()
  @IsString()
  controller: string;

  @ApiProperty()
  method: string;

  @ApiProperty()
  type: string;
}
