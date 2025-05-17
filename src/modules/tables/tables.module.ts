/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TableController } from 'src/controllers/table/table.controller';
import { TableService } from 'src/services/table/table.service';
import { PrismaModule } from '../prisma.module';
import { ExceptionModule } from '../exception.module';
import { TableRepository } from 'src/repositories/tabele.repository';

@Module({
  imports: [PrismaModule, ConfigModule, ExceptionModule],
  providers: [TableService, TableRepository],
  controllers: [TableController],
  exports: [TableService, TableRepository],
})
export class TablesModule {}
