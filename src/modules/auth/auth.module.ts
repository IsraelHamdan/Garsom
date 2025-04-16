/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { TokenService } from 'src/services/token/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [AuthService, TokenService, ExceptionHandler],
  controllers: [AuthController],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
