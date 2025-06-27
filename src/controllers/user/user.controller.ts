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
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDTO } from 'src/DTO/user/updatePassword.dto';
import { CreateUserDTO } from 'src/DTO/user/createUserDTO';
import { updateUserDTO } from 'src/DTO/user/updateUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { UserService } from 'src/services/user/user.service';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { JwtGuard } from 'src/utils/auth.guard';
import { AuthenticatedRequest } from 'src/utils/types/authenticatedRequest';
import ApiPostResponse from 'src/utils/decorators/ApiPostResponse';

@ApiTags('user controller')
@Controller('users')
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly exception: ExceptionHandler,
  ) {}

  @Post('createUser')
  @ApiPostResponse(CreateUserDTO)
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

  @Patch('update-password')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Alteração de senha do usuário, necessário passar o id dele como argumento',
  })
  async updatePassowrd(
    @Body() data: UpdatePasswordDTO,
    @Req() req: AuthenticatedRequest,
  ): Promise<UserResponseDTO | null> {
    try {
      const userId = req.user.userId;
      console.log('Dados recebidos no body:', data?.newPassword);
      console.log(`Dados recebidos no body: ${JSON.stringify(data)}`);

      return await this.user.updatePassword(userId, data);
    } catch (err) {
      if (err instanceof BadRequestException) console.error(err.message);
      if (err instanceof NotFoundException) console.error(err.message);
      if (err instanceof UnauthorizedException) console.error(err.message);

      throw new InternalServerErrorException(
        `Erro no controller de usuário: ${err}`,
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
