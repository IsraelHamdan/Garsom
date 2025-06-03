/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'user email must to have: gmail, iCloud, outlook, or yahoo',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'user passowrd must to have: min: 8, \n max:16, \n minLowercase: 2, \n minNumbers: 1, \n minUppercase: 1, \n minSymbols: 2,',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
