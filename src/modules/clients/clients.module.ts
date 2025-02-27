/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientController } from 'src/controllers/client/client.controller';
import { ClientService } from 'src/services/client/client.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  providers: [ClientService, PrismaService],
  controllers: [ClientController],
  exports: [ClientService, PrismaService],
})
export class ClientsModule {}
