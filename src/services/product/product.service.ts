/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/product.repository';
import { UserService } from '../user/user.service';
import { TableService } from '../table/table.service';
import { CreateProductDTO } from 'src/DTO/product/createProduct.dto';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { ProductResponseDTO } from 'src/DTO/product/productResponse.dto';
import { UpdateProductDTO } from 'src/DTO/product/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly product: ProductRepository,
    private readonly user: UserService,
    private readonly table: TableService,
    private readonly exception: ExceptionHandler,
  ) {}

  async createProduct(
    data: CreateProductDTO,
    userId: string,
    tableId: string,
  ): Promise<ProductResponseDTO> {
    try {
      const user = await this.user.findUser(userId);
      if (!user) throw new NotFoundException('Usuário não encontrado');
      const table = await this.table.findTableById(tableId);
      if (!table) throw new NotFoundException('Mesa não encontrada');

      if (data.is_shared === true) {
        if (data.sharedUserIds?.length) {
          for (const sharedUserId of data.sharedUserIds) {
            const sharedUser = await this.user.findUser(sharedUserId);
            if (!sharedUser) {
              throw new NotFoundException(
                `Usuário com ID ${sharedUserId} não encontrado para o compartilhamento`,
              );
            }
          }
        }
      }

      return await this.product.createProduct(data, userId, tableId);
    } catch (err) {
      console.error(`Erro ao criar produto`);
      this.exception.serviceExceptionHandler(err);
    }
  }

  async findProductById(productId: string): Promise<ProductResponseDTO | null> {
    try {
      const product = await this.product.findProductById(productId);
      if (!product) throw new NotFoundException('Produto não encontrado');
      return product;
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      this.exception.serviceExceptionHandler(err);
    }
  }

  async findAllProducts(): Promise<Omit<ProductResponseDTO[], 'id'> | null> {
    try {
      return await this.product.findAllProducts();
    } catch (err) {
      this.exception.serviceExceptionHandler(err);
    }
  }

  async findProductsOnTable(
    tableId: string,
  ): Promise<ProductResponseDTO[] | null> {
    try {
      return await this.product.findProductsOnTable(tableId);
    } catch (err) {
      this.exception.serviceExceptionHandler(err);
    }
  }

  async findProductsByUser(
    userId: string,
  ): Promise<Omit<ProductResponseDTO[], 'userId'> | null> {
    try {
      return await this.product.findProductsByUser(userId);
    } catch (err) {
      this.exception.serviceExceptionHandler(err);
    }
  }

  async updateProduct(
    productId: string,
    data: UpdateProductDTO,
  ): Promise<ProductResponseDTO> {
    try {
      const product = await this.product.findProductById(productId);
      if (!product) {
        throw new NotFoundException('Produto não encontrado para atualização');
      }

      return await this.product.updateProduct(productId, data);
    } catch (err) {
      this.exception.serviceExceptionHandler(err);
    }
  }

  async deleteProduct(productId: string) {
    try {
      const product = await this.product.findProductById(productId);
      if (!product) {
        throw new NotFoundException('Produto não encontrado para ser removido');
      }
      return await this.product.deleteProduct(productId);
    } catch (err) {
      this.exception.serviceExceptionHandler(err);
    }
  }
}
