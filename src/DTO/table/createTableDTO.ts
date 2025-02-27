/* eslint-disable prettier/prettier */

import { User } from '@prisma/client';

export interface CreateTableDTO {
  name?: string;
  codigo: string;
  createdBy: User;
}
