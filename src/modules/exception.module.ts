/* eslint-disable prettier/prettier */
// exception.module.ts
import { Module } from '@nestjs/common';
import { ExceptionHandler } from 'src/utils/exceptionHandler';

@Module({
  providers: [ExceptionHandler],
  exports: [ExceptionHandler],
})
export class ExceptionModule {}
