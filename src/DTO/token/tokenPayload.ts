/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from 'class-validator';

export class TokenPayload {
  @IsString()
  userId: string;

  @IsEmail()
  email: string;
}
