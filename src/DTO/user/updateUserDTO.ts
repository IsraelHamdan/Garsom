/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';

export class updateUserDTO implements Prisma.UserUpdateInput {
  nome?: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  email?: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  password?: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  Client?: Prisma.ClientUpdateOneWithoutUserNestedInput | undefined;
  table?: Prisma.TableUpdateOneWithoutUserNestedInput | undefined;
  histories?: Prisma.HistoryUpdateManyWithoutUserNestedInput | undefined;
  createdTables?: Prisma.TableUpdateManyWithoutCreatedByNestedInput | undefined;
}
