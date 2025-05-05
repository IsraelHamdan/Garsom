/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class updateUserDTO {
  @IsOptional()
  @IsString()
  nome?: string | undefined;

  @IsEmail()
  @IsOptional()
  @IsString()
  email?: string | undefined;

  @IsStrongPassword()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password?: string | undefined;

  @IsOptional()
  @IsUrl()
  photoURL?: string | null | undefined;

  @IsOptional()
  @IsString()
  token?: string;
}
