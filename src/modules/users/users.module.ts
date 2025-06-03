/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { UserRepository } from '../../repositories/user.repository';
import { TokenModule } from '../auth/token.module';

@Module({
  imports: [TokenModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
