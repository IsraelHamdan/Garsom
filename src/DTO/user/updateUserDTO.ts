/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class updateUserDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Nova nome do usuário' })
  nome?: string | undefined;

  @IsEmail()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Nova email do usuário' })
  email?: string | undefined;

  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({ type: String, description: 'Nova foto do usuário' })
  photoURL?: string | null | undefined;
  //modificar para o refreshToken no futuro
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Novo token do usuário' })
  token?: string;
}
