/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { TokenService } from 'src/services/token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ExceptionModule } from '../exception.module';

@Module({
  imports: [UsersModule, JwtModule, ExceptionModule],
  providers: [AuthService, TokenService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
