/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    // console.log('Modelos disponíveis no PrismaClient:', Object.keys(this));

    // // Verificar especificamente o modelo table
    // if (this['table']) {
    //   console.log('Modelo table está disponível');
    // } else {
    //   console.error('ERRO: Modelo table NÃO está disponível no PrismaClient');
    // }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
