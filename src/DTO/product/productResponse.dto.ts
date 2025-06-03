/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ProductResponseDTO {
  @ApiProperty({ type: String })
  @IsString()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  price: number;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  is_shared: boolean;

  @ApiProperty({ type: String })
  @IsString()
  userId: string;
}
