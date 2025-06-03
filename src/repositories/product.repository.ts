/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/DTO/product/createProduct.dto';
import { ProductResponseDTO } from 'src/DTO/product/productResponse.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionHandler } from 'src/utils/exceptionHandler';

@Injectable()
export class ProductRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly exception: ExceptionHandler,
  ) {}

  async createProduct(
    data: CreateProductDTO,
    userId: string,
  ): Promise<ProductResponseDTO> {
    try {
      return await this.prisma.product.create({
        data: { ...data, userId },
      });
    } catch (err) {
      console.error(`Erro ao tentar criar produto: ${err}`);
      this.exception.repositoryExceptionHandler(err);
    }
  }
}
