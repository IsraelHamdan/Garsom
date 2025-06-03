/* eslint-disable prettier/prettier */
// exception.module.ts
import { Global, Module } from '@nestjs/common';
import { ExceptionHandler } from 'src/utils/exceptionHandler';

@Global()
@Module({
  providers: [ExceptionHandler],
  exports: [ExceptionHandler],
  imports: [],
})
export class ExceptionModule {}
