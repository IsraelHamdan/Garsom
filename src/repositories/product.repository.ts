/* eslint-disable prettier/prettier */
import { Prisma, Product as ProductModel } from '@prisma/client';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from 'src/DTO/product/createProduct.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { ProductResponseDTO } from 'src/DTO/product/productResponse.dto';
import { UpdateProductDTO } from 'src/DTO/product/updateProduct.dto';

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

  async findProductById(productId: string): Promise<ProductResponseDTO> {
    console.log(
      '🚀 ~ ProductRepository ~ findProductById ~ productId:',
      productId,
    );
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException('Produto não encontrado');
      }
      return product;
    } catch (err) {
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async findAllProducts(): Promise<ProductResponseDTO[]> {
    try {
      const products = await this.prisma.product.findMany();
      if (!products) {
        throw new NotFoundException('Produtos não encontrados');
      }
      return products;
    } catch (err) {
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async findProductsOnTable(
    tableId: string,
  ): Promise<ProductResponseDTO[] | null> {
    try {
      const products = await this.prisma.product.findMany({
        where: { tableId: tableId },
      });
      if (!products) {
        throw new NotFoundException('Produtos não encontrados na mesa');
      }
      return products;
    } catch (err) {
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async findProductsByUser(
    userId: string,
  ): Promise<Omit<ProductResponseDTO[], 'userId'> | null> {
    try {
      const products = await this.prisma.product.findMany({
        where: { userId },
      });
      if (!products) {
        throw new NotAcceptableException('Produtos nao encontrados');
      }
      return products;
    } catch (err) {
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async updateProduct(
    productId: string,
    data: UpdateProductDTO,
  ): Promise<ProductResponseDTO> {
    try {
      return await this.prisma.product.update({
        where: { id: productId },
        data: { ...data },
      });
    } catch (err) {
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async deleteProduct(productId: string) {
    try {
      return await this.prisma.product.delete({ where: { id: productId } });
    } catch (err) {
      this.exception.repositoryExceptionHandler(err);
    }
  }
}
