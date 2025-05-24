/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinOnTableDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
