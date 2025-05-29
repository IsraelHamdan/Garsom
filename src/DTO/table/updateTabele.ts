/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsObject } from 'class-validator';

export class UpdateTableDTO {
  @ApiPropertyOptional({
    type: String,
    description: 'Nome da mesa',
    example: 'Mesa 01',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Total da mesa',
    example: 150.5,
  })
  @IsOptional()
  @IsNumber()
  total?: number;

  @ApiPropertyOptional({
    type: Object,
    description: 'Produtos da mesa',
  })
  @IsOptional()
  @IsObject()
  Product?: any; // ou crie um DTO específico para produtos
}
