/* eslint-disable prettier/prettier */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Define os domínios permitidos
const ALLOWED_DOMAINS = ['gmail.com', 'outlook.com', 'icloud.com', 'yahoo.com'];

@ValidatorConstraint({ async: false })
export class IsEmailFromAllowedDomainsConstraint
  implements ValidatorConstraintInterface
{
  validate(email: string): boolean {
    const domain = email.split('@')[1]; // Extrai o domínio
    return ALLOWED_DOMAINS.includes(domain);
  }

  defaultMessag(): string {
    return `O email deve ser de um dos seguintes domínios: ${ALLOWED_DOMAINS.join(', ')}`;
  }
}
