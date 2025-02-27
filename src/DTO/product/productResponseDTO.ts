/* eslint-disable prettier/prettier */
import { Product, ClientProduct, SharedProduct } from '@prisma/client';

export class ProductResponseDTO implements Product {
  name: string;
  id: string;
  price: number;
  tableId: string;
  is_shared: boolean;
  sharedProducts: SharedProduct[];
  clientProduct: ClientProduct[];
}
