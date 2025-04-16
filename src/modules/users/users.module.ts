/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user/user.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UserService } from 'src/services/user/user.service';
import { UserRepository } from '../../repositories/user.repository';
import { ExceptionHandler } from 'src/utils/exceptionHandler';

@Module({
  providers: [UserService, PrismaService, UserRepository, ExceptionHandler],
  controllers: [UserController],
  exports: [UserService, PrismaService, UserRepository],
})
export class UsersModule {}
