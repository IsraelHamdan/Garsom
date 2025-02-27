/* eslint-disable prettier/prettier */
import { ClientProductDTO } from '../relationTables/clientProductDTO';

export interface CreateProductDTO {
  name: string;
  price: string;
  tableId: string;
  isShared: boolean;
  clientProducts: ClientProductDTO[];
}
