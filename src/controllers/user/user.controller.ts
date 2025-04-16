/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { updateUserDTO } from 'src/DTO/user/updateUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { UserService } from 'src/services/user/user.service';
import { ExceptionHandler } from 'src/utils/exceptionHandler';

@ApiTags('user controller')
@Controller('users')
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly exception: ExceptionHandler,
  ) {}

  @Get('find')
  async findUser(@Param('id') id: string): Promise<UserResponseDTO | null> {
    return await this.user.findUser(id);
  }

  // @Get()
  // async findMany(): Promise<UserResponseDTO[] | null> {
  //   return await this.user.findAllUsers() as UserResponseDTO;
  // }

  @Put('update')
  async upadateUser(
    @Body() data: updateUserDTO,
    @Param('id') id: string,
  ): Promise<UserResponseDTO> {
    return await this.user.updateUser(id, data);
  }

  @Patch('updateProfilePhoto')
  async updateProfilePhoto(
    @Param('id') id: string,
    @Body() data: string,
  ): Promise<UserResponseDTO> {
    return await this.user.updateProfilePhoto(id, data);
  }

  @Delete('delete/:id')
  async deleteUser(id: string) {
    return await this.user.delete(id);
  }
}
