/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpadatePasswordDTO } from 'src/DTO/user/updatePassword.dto';
import { CreateUserDTO } from 'src/DTO/user/createUserDTO';
import { updateUserDTO } from 'src/DTO/user/updateUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { UserService } from 'src/services/user/user.service';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { JwtGuard } from 'src/utils/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('user controller')
@Controller('users')
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly exception: ExceptionHandler,
  ) {}

  @Post('createUser')
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() data: CreateUserDTO): Promise<UserResponseDTO> {
    try {
      return await this.user.createUser(data);
    } catch (err) {
      this.exception.controllerExceptionHandler(err as Error);
    }
  }

  @Get('find')
  async findUser(@Param('id') id: string): Promise<UserResponseDTO | null> {
    return await this.user.findUser(id);
  }

  @Get('findAll')
  async findMany(): Promise<UserResponseDTO[] | null> {
    return await this.user.findAllUsers();
  }

  @Put('update')
  @UseGuards(new JwtGuard('jwt'))
  @ApiBearerAuth()
  async upadateUser(
    @Body() data: updateUserDTO,
    @Param('id') id: string,
  ): Promise<UserResponseDTO> {
    try {
      return await this.user.updateUser(id, data);
    } catch (err) {
      if (err instanceof BadRequestException) console.error(err.message);
      if (err instanceof NotFoundException) console.error(err.message);
      if (err instanceof UnauthorizedException) console.error(err.message);

      throw new InternalServerErrorException(
        `Erro no controler de usuário: ${err}`,
      );
    }
  }

  @Patch('update-password/:id')
  @UseGuards(new JwtGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Alteração de senha do usuário, necessário passar o id dele como argumento',
  })
  async updatePassowrd(
    @Param('id') id: string,
    @Body() data: UpadatePasswordDTO,
  ): Promise<UserResponseDTO | null> {
    try {
      console.log('ID recebido:', id);
      console.log('Dados recebidos no body:', data);

      return await this.user.updatePassword(id, data);
    } catch (err) {
      console.error('Erro capturado no controller:', err);
      console.error('Stack trace:', err.stack);

      if (err instanceof BadRequestException) console.error(err.message);
      if (err instanceof NotFoundException) console.error(err.message);
      if (err instanceof UnauthorizedException) console.error(err.message);

      throw new InternalServerErrorException(
        `Erro no controller de usuário: ${err.message || err}`,
      );
    }
  }

  @Patch('updateProfilePhoto')
  @UseGuards(new JwtGuard('jwt'))
  @ApiOperation({
    summary:
      'Alteração de foto do usuário, necessário passar o id dele como argumento',
  })
  async updateProfilePhoto(
    @Param('id') id: string,
    @Body() data: string,
  ): Promise<UserResponseDTO> {
    try {
      return await this.user.updateProfilePhoto(id, data);
    } catch (err) {
      if (err instanceof BadRequestException) console.error(err.message);
      if (err instanceof NotFoundException) console.error(err.message);
      if (err instanceof UnauthorizedException) console.error(err.message);

      throw new InternalServerErrorException(
        `Erro no controler de usuário: ${err}`,
      );
    }
  }
  @Delete('delete/:id')
  @UseGuards(new JwtGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar o usuário',
  })
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.user.delete(id);
    } catch (err) {
      if (err instanceof BadRequestException) console.error(err.message);
      if (err instanceof NotFoundException) console.error(err.message);
      if (err instanceof UnauthorizedException) console.error(err.message);

      throw new InternalServerErrorException(
        `Erro no controler de usuário: ${err}`,
      );
    }
  }

  @Delete('clear')
  async deleteEveryone(): Promise<void> {
    try {
      await this.user.deleteEveryone();
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }
}
