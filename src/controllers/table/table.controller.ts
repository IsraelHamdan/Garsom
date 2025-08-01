/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateTableDTO } from 'src/DTO/table/createTableDTO';
import { JoinOnTableDTO } from 'src/DTO/table/joinOnTable';
import { TableParticipantsResponseDTO } from 'src/DTO/table/tableParticipantsResponseDTO';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import { UpdateTableDTO } from 'src/DTO/table/updateTabele';
import { TableService } from 'src/services/table/table.service';
import { JwtGuard } from 'src/utils/auth.guard';
import ApiDeleteResponse from 'src/utils/decorators/ApiDeleteResponse';
import ApiGetResponse from 'src/utils/decorators/ApiGetResponse';
import ApiPatchResponse from 'src/utils/decorators/ApiPatchResponse';
import ApiPostResponse from 'src/utils/decorators/ApiPostResponse';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { AuthenticatedRequest } from 'src/utils/types/authenticatedRequest';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('table')
export class TableController {
  constructor(
    private readonly tableService: TableService,
    private exception: ExceptionHandler,
  ) {}

  @Post('create-new-table')
  @ApiOperation({ summary: 'Creating new table' })
  @ApiPostResponse(CreateTableDTO)
  async createTable(
    @Body() data: CreateTableDTO,
    @Req() req: AuthenticatedRequest,
  ): Promise<TableResponseDTO> {
    try {
      const userId = req.user.userId;
      if (!data || Object.keys(data).length === 0) {
        throw new BadRequestException(
          'Body da requisição não pode estar vazio.',
        );
      }

      return await this.tableService.createTable(data, userId);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Post('joinOnTable')
  @ApiPostResponse(TableResponseDTO)
  @ApiOperation({ summary: 'Users can join on the table' })
  async addUserOnTable(
    @Req() req: AuthenticatedRequest,
    @Body() data: JoinOnTableDTO,
  ): Promise<TableParticipantsResponseDTO> {
    try {
      const userId = req.user.userId;
      return await this.tableService.joinOnTable(userId, data.code);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Get(':code')
  @ApiGetResponse(TableResponseDTO)
  @ApiOperation({ summary: 'Find table by code' })
  @ApiParam({
    type: String,
    name: 'code',
    required: true,
  })
  async findTableByCode(
    @Param('code') code: string,
  ): Promise<TableResponseDTO | null> {
    console.log('🚀 ~ TableController ~ code:', code);
    try {
      return this.tableService.findUniqueTable(code);
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Find all tables' })
  @ApiGetResponse(TableResponseDTO)
  async findAllTables(): Promise<TableResponseDTO[] | null> {
    try {
      return await this.tableService.findAllTables();
    } catch (err) {
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Patch('updateTable/:code')
  @ApiPatchResponse(TableResponseDTO)
  @ApiParam({
    name: 'code',
    type: String,
    required: true,
  })
  async updateTable(
    @Body() data: UpdateTableDTO,
    @Param('code') code: string,
  ): Promise<TableResponseDTO> {
    try {
      console.log(`Data keys: ${Object.keys(data).join(', ')}`);
      console.log(`This is table data: ${JSON.stringify(data)}`);
      if (!data || Object.keys(data).length === 0) {
        throw new BadRequestException('Nenhum dado fornecido para atualização');
      }

      return this.tableService.updateTable(data, code);
    } catch (err) {
      console.error(`Erro ao tentar atualizar a mesa`);
      if (err instanceof HttpException) {
        throw err;
      }
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Delete('deleteTable/:code')
  @ApiParam({
    name: 'code',
    type: String,
    required: true,
  })
  @ApiDeleteResponse(TableResponseDTO)
  async deleteTable(@Param('code') code: string) {
    try {
      return await this.tableService.deleteTable(code);
    } catch (err) {
      console.error(`Erro ao deletar a mesa: ${err}`);

      if (err instanceof HttpException) {
        throw err;
      }

      this.exception.controllerExceptionHandler(err);
    }
  }
}
