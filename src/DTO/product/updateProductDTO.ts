/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';

export class UpdateProductDTO implements Prisma.ProductUpdateInput {
  name?: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  price?: number | Prisma.FloatFieldUpdateOperationsInput | undefined;
  is_shared?: boolean | Prisma.BoolFieldUpdateOperationsInput | undefined;
  sharedProducts?:
    | Prisma.SharedProductUpdateManyWithoutProductNestedInput
    | undefined;
  clientProducts?:
    | Prisma.ClientProductUpdateManyWithoutProductNestedInput
    | undefined;
}
