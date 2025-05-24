/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TableController } from 'src/controllers/table/table.controller';
import { TableService } from 'src/services/table/table.service';
import { ExceptionModule } from '../exception.module';
import { TableRepository } from 'src/repositories/table.repository';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, ConfigModule, ExceptionModule, UsersModule],
  providers: [TableService, TableRepository],
  controllers: [TableController],
  exports: [TableService, TableRepository],
})
export class TableModule {}
