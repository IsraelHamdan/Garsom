/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';

export class UpdateClientDTO implements Prisma.ClientUpdateInput {
  shared_value?: number | Prisma.FloatFieldUpdateOperationsInput | undefined;
  sharedProducts?:
    | Prisma.SharedProductUpdateManyWithoutClientNestedInput
    | undefined;
  clientProducts?:
    | Prisma.ClientProductUpdateManyWithoutClientNestedInput
    | undefined;
  my_buill?: number | Prisma.FloatFieldUpdateOperationsInput | undefined;
}
