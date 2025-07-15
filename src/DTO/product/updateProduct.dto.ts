/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ type: Number })
  price?: number;

  @IsBoolean()
  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  is_shared?: boolean;
}
