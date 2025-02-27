/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TableController } from 'src/controllers/table/table.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TableService } from 'src/services/table/table.service';

@Module({
  providers: [TableService, PrismaService],
  controllers: [TableController],
  exports: [TableService, PrismaService],
})
export class TablesModule {}
