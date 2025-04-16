/* eslint-disable prettier/prettier */
import { User } from '@prisma/client';
import { IsDate, IsJWT, IsString } from 'class-validator';

export class CreateTokenBlacklistDTO {
  @IsString()
  userId: string;

  @IsJWT()
  token: string;

  user: User;

  @IsDate()
  expiresAt: Date;
}
