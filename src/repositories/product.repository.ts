/* eslint-disable prettier/prettier */
import { Prisma, Product as ProductModel } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from 'src/DTO/product/createProduct.dto';
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
    tableId: string,
  ): Promise<ProductModel> {
    try {
      const { sharedUserIds = [], is_shared, ...productData } = data;

      const args: Prisma.ProductCreateArgs = {
        data: {
          ...productData,
          userId,
          tableId,
          is_shared,
          ...(is_shared && sharedUserIds.length > 0
            ? {
                SharedProduct: {
                  createMany: {
                    data: sharedUserIds.map((sharedUserId) => ({
                      userId: sharedUserId,
                      tableId,
                    })),
                  },
                },
              }
            : {}),
        },
        include: { SharedProduct: true },
      };

      return await this.prisma.product.create(args);
    } catch (err) {
      console.error(`Erro ao tentar criar produto: ${err}`);
      this.exception.repositoryExceptionHandler(err);
    }
  }
}
