/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';

export class updateUserDTO implements Prisma.UserUpdateInput {
  password?: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  name?: string;
  email?: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  Client?: Prisma.ClientUpdateOneWithoutUserNestedInput | undefined;
  table?: Prisma.TableUpdateOneWithoutUserNestedInput | undefined;
  histories?: Prisma.HistoryUpdateManyWithoutUserNestedInput | undefined;
}
