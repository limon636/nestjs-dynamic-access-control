import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { UserService } from "./user.service";

@ValidatorConstraint({ name: "IsUnique", async: true })
@Injectable()
export class IsUniqueRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string) {
    console.log("this.userService", this.userService);
    return this.userService.findByUsername(value).then((user) => {
      if (user) return false;
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `Username already exist`;
  }
}
