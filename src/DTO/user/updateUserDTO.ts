/* eslint-disable prettier/prettier */
import { Prisma } from '@prisma/client';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class updateUserDTO implements Prisma.UserUpdateInput {
  @IsOptional()
  @IsString()
  nome?: string | Prisma.StringFieldUpdateOperationsInput | undefined;

  @IsEmail()
  @IsOptional()
  @IsString()
  email?: string | Prisma.StringFieldUpdateOperationsInput | undefined;

  @IsStrongPassword()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password?: string | Prisma.StringFieldUpdateOperationsInput | undefined;

  @IsOptional()
  Client?: Prisma.ClientUpdateOneWithoutUserNestedInput | undefined;

  @IsOptional()
  table?: Prisma.TableUpdateOneWithoutUserNestedInput | undefined;

  @IsOptional()
  histories?: Prisma.HistoryUpdateManyWithoutUserNestedInput | undefined;

  @IsOptional()
  createdTables?: Prisma.TableUpdateManyWithoutCreatedByNestedInput | undefined;

  @IsOptional()
  @IsUrl()
  photoURL?:
    | string
    | Prisma.NullableStringFieldUpdateOperationsInput
    | null
    | undefined;
}
