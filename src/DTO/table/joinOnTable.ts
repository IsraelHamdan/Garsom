/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinOnTableDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @IsString()
  code: string;
}
