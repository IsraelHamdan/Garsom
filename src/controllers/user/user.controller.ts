/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatePasswordDTO } from 'src/DTO/user/updatePassword.dto';
import { CreateUserDTO } from 'src/DTO/user/createUserDTO';
import { updateUserDTO } from 'src/DTO/user/updateUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { UserService } from 'src/services/user/user.service';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { JwtGuard } from 'src/utils/auth.guard';
import { AuthenticatedRequest } from 'src/utils/types/authenticatedRequest';
import ApiPostResponse from 'src/utils/decorators/ApiPostResponse';
import ApiGetResponse from 'src/utils/decorators/ApiGetResponse';

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

  @Get(':userId')
  @ApiGetResponse(UserResponseDTO)
  @ApiOperation({ summary: 'Busca o usuário logado' })
  async findUser(
    @Req() req: AuthenticatedRequest,
  ): Promise<UserResponseDTO | null> {
    try {
      const id = req.user.userId;
      return await this.user.findUser(id);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Get('findAll')
  async findMany(): Promise<UserResponseDTO[] | null> {
    try {
      return await this.user.findAllUsers();
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Patch('update')
  @UseGuards(new JwtGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user info' })
  async upadateUser(
    @Body() data: updateUserDTO,
    @Req() req: AuthenticatedRequest,
  ): Promise<UserResponseDTO> {
    try {
      const id = req.user.userId;
      return await this.user.updateUser(id, data);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
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
      return await this.user.updatePassword(userId, data);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Patch('updateProfilePhoto')
  @UseGuards(new JwtGuard('jwt'))
  @ApiOperation({
    summary:
      'Alteração de foto do usuário, necessário passar o id dele como argumento',
  })
  async updateProfilePhoto(
    @Req() req: AuthenticatedRequest,
    @Body() data: string,
  ): Promise<UserResponseDTO> {
    try {
      const id = req.user.userId;
      return await this.user.updateProfilePhoto(id, data);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Delete('delete/:id')
  @UseGuards(new JwtGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar o usuário',
  })
  async deleteUser(@Req() req: AuthenticatedRequest) {
    try {
      const id = req.user.userId;
      return await this.user.delete(id);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }
}
