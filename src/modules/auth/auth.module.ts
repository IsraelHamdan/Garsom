/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ExceptionModule } from '../exception.module';
import { TokenModule } from './token.module';

@Module({
  imports: [UsersModule, ExceptionModule, TokenModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
