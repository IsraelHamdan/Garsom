/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/DTO/user/createUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<UserResponseDTO> {
    console.log('Received request to create user:', data);
    return await this.user.createUser(data);
  }
}
