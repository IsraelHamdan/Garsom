/* eslint-disable prettier/prettier */
import { Client, ClientProduct, SharedProduct } from '@prisma/client';

export class ClientResponseDTO implements Client {
  id: string;
  userId: string;
  tableId: string;
  my_buill: number;
  shared_value: number;
  clientProduct: ClientProduct[];
  sharaedProduct: SharedProduct[];
}
