/* eslint-disable prettier/prettier */
import { User } from '@prisma/client';

export class UserResponseDTO implements User {
  id: string;
  nome: string;
  email: string;
  password: string;
  tableId: string | null;
}
