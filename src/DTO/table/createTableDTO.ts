/* eslint-disable prettier/prettier */

import { User } from '@prisma/client';

export interface CreateTableDTO {
  name?: string;
  code: string;
  createdBy: User;
}
