import { ValidationOptions, registerDecorator } from "class-validator";
import { IsUniqueRule } from "./IsUniqueRule";

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueRule,
    });
  };
}
