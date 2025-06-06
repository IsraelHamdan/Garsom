/* eslint-disable prettier/prettier */
import { Product, User } from '@prisma/client';
import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

export class TableResponseDTO {
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

  @IsString()
  link?: string;

  participants?: string[];
  products?: string[];
  createdBy?: User;
}
