/* eslint-disable prettier/prettier */
import { User } from '@prisma/client';
import { IsDate, IsInt, IsString } from 'class-validator';

export class TokenBlacklistDTO {
  @IsInt()
  id: number;

  @IsString()
  token: string;

  @IsString()
  userId: string;

  user: User;

  @IsDate()
  createdAt: Date;

  @IsDate()
  expiresAt: Date;
}
