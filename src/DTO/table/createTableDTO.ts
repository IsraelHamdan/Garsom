/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTableDTO {
  @ApiProperty({ type: String })
  @IsString()
  name: string;
}
