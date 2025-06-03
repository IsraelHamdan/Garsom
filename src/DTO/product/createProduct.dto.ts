/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  isShared: boolean;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  tableId: string;
}
