/* eslint-disable prettier/prettier */
import { Table } from '@prisma/client';

export class UserResponseDTO {
  id: string;
  name: string;
  email: string;
  password?: string;
  tableId: string | null;
  photoURL: string | null;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
  //relation coluns

  histories?: History[] = [];
  createdTables?: Table[] = [];
  table?: Table | null;
}
