/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { ExceptionHandler } from '../../utils/exceptionHandler';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../../DTO/user/createUserDTO';
import { UserResponseDTO } from '../../DTO/user/userResponseDTO';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
    private readonly exception: ExceptionHandler
  ) {}

  @Post('createUser')
  @ApiOperation({ summary: 'Create user' })
  async  createUser(@Body( )data: CreateUserDTO): Promise<UserResponseDTO> {
    try {
      return await this.authService.createUser(data);
    } catch (err) {
      this.exception.controllerExceptionHandler(err as Error)
    }
  }

}
