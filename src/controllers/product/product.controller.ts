/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateProductDTO } from 'src/DTO/product/createProduct.dto';
import { ProductResponseDTO } from 'src/DTO/product/productResponse.dto';
import { ProductService } from 'src/services/product/product.service';
import { JwtGuard } from 'src/utils/auth.guard';
import ApiGetResponse from 'src/utils/decorators/ApiGetResponse';
import ApiPostResponse from 'src/utils/decorators/ApiPostResponse';
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

  @Post('createProduct/:tableId')
  @ApiOperation({
    summary: 'Endpoint para criar um produto especifico',
  })
  @ApiParam({
    name: 'tableId',
    description: 'Id da mesa ',
    required: true,
    type: String,
  })
  @ApiPostResponse(CreateProductDTO)
  async createProduct(
    @Param('tableId') tableId: string,
    @Req() req: AuthenticatedRequest,
    @Body() data: CreateProductDTO,
  ): Promise<Omit<ProductResponseDTO, 'userId'>> {
    try {
      const userId = req.user.userId;
      return await this.product.createProduct(data, userId, tableId);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Get(':productId')
  @ApiGetResponse(ProductResponseDTO)
  @ApiOperation({
    summary: 'Endpoint para buscar um produto especifico',
  })
  @ApiParam({
    name: 'productId',
    type: String,
  })
  async findProductById(@Param('productId') id: string) {
    try {
      return await this.product.findProductById(id);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Find all products' })
  @ApiGetResponse(ProductResponseDTO)
  async findAllProducts(): Promise<Omit<ProductResponseDTO[], 'id'>> {
    try {
      const products = await this.product.findAllProducts();
      if (!products) {
        throw new NotFoundException('Produtos não encontrados');
      }
      return products;
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Get('/product/:tableId')
  @ApiParam({
    type: String,
    name: 'tableId',
    required: true,
  })
  @ApiOperation({ description: 'Find products on table' })
  @ApiGetResponse(ProductResponseDTO)
  async findProductsOnTable(
    @Param('tableId') tableId: string,
  ): Promise<ProductResponseDTO[] | null> {
    try {
      return await this.product.findProductsOnTable(tableId);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }
}
