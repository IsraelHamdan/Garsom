/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateTableDTO } from 'src/DTO/table/createTableDTO';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import { TableService } from 'src/services/table/table.service';
import { JwtGuard } from 'src/utils/auth.guard';
import { AuthenticatedRequest } from 'src/utils/types/authenticatedRequest';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('table')
export class TableController {
  constructor(
    private readonly tableService: TableService,
    private readonly config: ConfigService,
  ) {}

  @Post('create-new-table')
  async createTable(
    @Body() data: CreateTableDTO,
    @Req() req: AuthenticatedRequest,
  ): Promise<TableResponseDTO> {
    try {
      const userId = req.user.userId;
      return await this.tableService.createTable(data, userId);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
