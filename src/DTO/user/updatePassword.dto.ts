/* eslint-disable prettier/prettier */
import { IsJWT, IsString, IsStrongPassword, Length } from 'class-validator';

export class UpadatePasswordDTO {
  @IsString()
  id: string;

  @IsJWT()
  token: string;

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
  newPassword: string;
}
