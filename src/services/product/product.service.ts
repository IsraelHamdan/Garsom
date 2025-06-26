/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/product.repository';
import { UserService } from '../user/user.service';
import { TableService } from '../table/table.service';
import { CreateProductDTO } from 'src/DTO/product/createProduct.dto';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { ProductResponseDTO } from 'src/DTO/product/productResponse.dto';

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
}
