/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsEmailFromAllowedDomainsConstraint } from './verifyDomain';

export function IsEmailFromAllowedDomains(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailFromAllowedDomainsConstraint,
    });
  };
}
