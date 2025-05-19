/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty({ type: String, description: 'Senha antiga' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 2,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 2,
  })
  @Length(8, 16)
  @ApiProperty({ type: String, description: 'Nova senha' })
  @IsNotEmpty()
  newPassword: string;
}
