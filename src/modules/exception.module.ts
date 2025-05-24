/* eslint-disable prettier/prettier */
// exception.module.ts
import { Module } from '@nestjs/common';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  providers: [ExceptionHandler],
  exports: [ExceptionHandler],
  imports: [PrismaModule],
})
export class ExceptionModule {}
