/* eslint-disable prettier/prettier */
import { Table, Client, History, Product, User } from '@prisma/client';

export class TableResponseDTO implements Table {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  total: number;
  userId: string;
  clients: Client[];
  histories: History[];
  products: Product[];
  createdBy: User;
  code: string;
}
