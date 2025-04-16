/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateTableDTO {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsString()
  code: string; // Código único da mesa gerado e validado no serviço
}
