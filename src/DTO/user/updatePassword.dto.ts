/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString, IsStrongPassword, Length } from 'class-validator';

export class UpadatePasswordDTO {
  @ApiProperty({ type: String, description: 'user id' })
  @IsString()
  id: string;

  @ApiProperty({ type: String, description: 'Senha antiga' })
  @IsString()
  oldPassword: string;

  // @IsStrongPassword({
  //   minLength: 8,
  //   minLowercase: 2,
  //   minNumbers: 1,
  //   minUppercase: 1,
  //   minSymbols: 2,
  // })
  @Length(8, 16)
  @ApiProperty({ type: String, description: 'Nova senha' })
  newPassword: string;
}
