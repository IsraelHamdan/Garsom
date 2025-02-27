/* eslint-disable prettier/prettier */
import { User, Client, History, Table } from '@prisma/client';

export class UserResponseDTO implements User {
  id: string;
  nome: string;
  email: string;
  password: string;
  tableId: string | null;

  Client?: Client | null;
  histories: History[] = [];
  createdTables: Table[] = [];
  table?: Table | null;
}
