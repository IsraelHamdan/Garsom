/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductController } from 'src/controllers/product/product.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductService } from 'src/services/product/product.service';

@Module({
  providers: [ProductService, PrismaService],
  controllers: [ProductController],
  exports: [PrismaService, ProductService],
})
export class ProductsModule {}
