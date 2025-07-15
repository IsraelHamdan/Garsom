/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';
import { CreateProductDTO } from 'src/DTO/product/createProduct.dto';
import { ProductResponseDTO } from 'src/DTO/product/productResponse.dto';
import { UpdateProductDTO } from 'src/DTO/product/updateProduct.dto';
import { ProductService } from 'src/services/product/product.service';
import { JwtGuard } from 'src/utils/auth.guard';
import ApiGetResponse from 'src/utils/decorators/ApiGetResponse';
import ApiPatchResponse from 'src/utils/decorators/ApiPatchResponse';
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
  @ApiOperation({ summary: 'Find products on table' })
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

  @Get('productsByUser')
  @ApiGetResponse(ProductResponseDTO)
  @ApiOperation({ summary: 'Busca os produtos do usuário logado!' })
  async findProductsByUser(
    @Req() req: AuthenticatedRequest,
  ): Promise<Omit<ProductResponseDTO[], 'userId'> | null> {
    try {
      const userId = req.user.userId;
      if (!userId) {
        throw new UnauthorizedException(
          'Id do usuário não fornecido na requisição',
        );
      }
      return await this.product.findProductsByUser(userId);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Patch('/:producId')
  @ApiOperation({
    summary: 'Atualizando dados do produto',
  })
  @ApiProperty({
    name: 'productId',
    type: String,
    required: true,
  })
  @ApiPatchResponse(ProductResponseDTO)
  async updateProduct(
    @Param('productId') productId: string,
    @Body() data: UpdateProductDTO,
  ): Promise<ProductResponseDTO> {
    try {
      return await this.product.updateProduct(productId, data);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Delete('/:productId')
  @ApiOperation({
    summary: 'Delete product',
  })
  @ApiProperty({
    type: String,
    name: 'ProductId',
  })
  async deleteProduct(@Param('productId') productId: string) {
    try {
      return await this.product.deleteProduct(productId);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }
}
