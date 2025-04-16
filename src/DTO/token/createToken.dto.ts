/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from 'class-validator';

export class CreateTokenDTO {
  @IsEmail()
  email: string;

  @IsString()
  userId: string;
}
