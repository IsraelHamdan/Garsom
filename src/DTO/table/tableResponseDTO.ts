/* eslint-disable prettier/prettier */
import { Table, Client, Product, User } from '@prisma/client';
import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';
import { HistoryDTO } from '../history/historyDTO';

export class TableResponseDTO implements Table {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsNumber()
  total: number;

  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  code: string;

  clients: Client[];
  histories?: HistoryDTO[];
  products: Product[];
  createdBy: User;
}
