/* eslint-disable prettier/prettier */
import { Client, History, Table } from '@prisma/client';

export class UserResponseDTO {
  id: string;
  name: string;
  email: string;
  password?: string;
  tableId: string | null;
  photoURL: string | null;
  token: string;
  Client?: Client | null;
  histories?: History[] = [];
  createdTables?: Table[] = [];
  table?: Table | null;
}
