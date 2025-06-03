/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ProductRepository } from 'src/repositories/product.repository';
import { ProductService } from 'src/services/product/product.service';
import { ProductController } from 'src/controllers/product/product.controller';
import { TableModule } from '../tables/tables.module';

@Module({
  imports: [UsersModule, TableModule],
  providers: [ProductRepository, ProductService],
  controllers: [ProductController],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
