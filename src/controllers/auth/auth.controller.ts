/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ExceptionHandler } from '../../utils/exceptionHandler';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../../DTO/user/createUserDTO';
import { UserResponseDTO } from '../../DTO/user/userResponseDTO';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDTO } from 'src/DTO/user/login.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly exception: ExceptionHandler,
  ) {}

  @Post('createUser')
  @ApiOperation({ summary: 'Create user' })
  async createUser(@Body() data: CreateUserDTO): Promise<UserResponseDTO> {
    try {
      return await this.authService.createUser(data);
    } catch (err) {
      this.exception.controllerExceptionHandler(err as Error);
    }
  }

  @Post('Login')
  @ApiOperation({ summary: 'login' })
  @ApiBody({ type: LoginDTO })
  @UseInterceptors(NoFilesInterceptor())
  async login(@Body() data: LoginDTO): Promise<UserResponseDTO> {
    try {
      return await this.authService.login(data);
    } catch (err) {
      this.exception.controllerExceptionHandler(err as Error);
    }
  }
}
