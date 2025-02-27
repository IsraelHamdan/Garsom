/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user/user.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UserService } from 'src/services/user/user.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService, PrismaService],
})
export class UsersModule {}
