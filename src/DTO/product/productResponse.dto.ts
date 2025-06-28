/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ProductResponseDTO {
  @ApiProperty({ type: String, description: 'Product Id' })
  @IsString()
  id: string;

  @ApiProperty({ type: String, description: 'name of product' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: 'product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String, description: 'user Id' })
  @IsString()
  userId: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'Does product is shared?' })
  is_shared: boolean;
}
