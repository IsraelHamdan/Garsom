/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';

export class UpdateTableDTO implements Prisma.TableUpdateInput {
  name?: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  clients?: Prisma.ClientUpdateManyWithoutTableNestedInput | undefined;
  updated_at?:
    | string
    | Prisma.DateTimeFieldUpdateOperationsInput
    | Date
    | undefined;
  total?: number | Prisma.FloatFieldUpdateOperationsInput | undefined;
  products?: Prisma.ProductUpdateManyWithoutTableNestedInput | undefined;
}
