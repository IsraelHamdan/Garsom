/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { UserRepository } from '../../repositories/user.repository';
import { PrismaModule } from '../prisma.module';
import { ExceptionModule } from '../exception.module';

@Module({
  imports: [PrismaModule, ExceptionModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
