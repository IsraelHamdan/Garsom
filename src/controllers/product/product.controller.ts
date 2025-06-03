/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDTO } from 'src/DTO/product/createProduct.dto';
import { ProductResponseDTO } from 'src/DTO/product/productResponse.dto';
import { ProductService } from 'src/services/product/product.service';
import { JwtGuard } from 'src/utils/auth.guard';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { AuthenticatedRequest } from 'src/utils/types/authenticatedRequest';

@Controller('product')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class ProductController {
  constructor(
    private readonly product: ProductService,
    private readonly exception: ExceptionHandler,
  ) {}

  @Post('createTable/:tableId')
  async createProduct(
    @Param(':tableId') tableId: string,
    @Body() data: CreateProductDTO,
    @Req() req: AuthenticatedRequest,
  ): Promise<ProductResponseDTO> {
    try {
      const userId = req.user.userId;
      const newProduct = {
        ...data,
        tableId,
      };
      return await this.product.createProduct(newProduct, userId);
    } catch (err) {
      console.error(`Erro ao criar produto: ${err}`);
      this.exception.controllerExceptionHandler(err);
    }
  }
}
