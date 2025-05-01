/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TokenService } from 'src/services/token/token.service';
import { ExceptionModule } from '../exception.module';
import { JwtGlobalModule } from './jwtGlobal.module';

@Module({
  imports: [ExceptionModule, JwtGlobalModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
