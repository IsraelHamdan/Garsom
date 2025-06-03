/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TokenService } from 'src/services/token/token.service';

@Module({
  imports: [],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
