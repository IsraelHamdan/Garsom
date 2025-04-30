/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { IsEmailFromAllowedDomains } from 'src/utils/validateEmail/registerDecorator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'This property most contain full user name',
    example: 'Jonathan Mangno Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email must to have: gmail, outlook, yahoo',
  })
  @IsEmail()
  @IsEmailFromAllowedDomains()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'The password must contain 8 to 16 characters, with upper and lower case letters, as well as special characters.',
  })
  // @IsStrongPassword({
  //   minLength: 8,
  //   minLowercase: 2,
  //   minNumbers: 1,
  //   minUppercase: 1,
  //   minSymbols: 2,
  // })
  @Length(8, 16)
  password: string;
}
