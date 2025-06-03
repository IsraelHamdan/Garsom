/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { TokenModule } from './token.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [UsersModule, TokenModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
