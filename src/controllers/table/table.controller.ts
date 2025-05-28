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
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTableDTO } from 'src/DTO/table/createTableDTO';
import { JoinOnTableDTO } from 'src/DTO/table/joinOnTable';
import { TableParticipantsResponseDTO } from 'src/DTO/table/tableParticipantsResponseDTO';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import { TableService } from 'src/services/table/table.service';
import { JwtGuard } from 'src/utils/auth.guard';
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
  async createTable(
    @Body() data: CreateTableDTO,
    @Req() req: AuthenticatedRequest,
  ): Promise<TableResponseDTO> {
    try {
      const userId = req.user.userId;
      return await this.tableService.createTable(data, userId);
    } catch (err) {
      console.error(`Erro ao criar mesa: ${err}`);
      this.exception.controllerExceptionHandler(err);
    }
  }

  @Post('joinOnTable')
  async addUserOnTable(
    @Req() req: AuthenticatedRequest,
    @Body() data: JoinOnTableDTO,
  ): Promise<TableParticipantsResponseDTO> {
    try {
      const userId = req.user.userId;
      return await this.tableService.joinOnTable(userId, data.code);
    } catch (err) {
      console.error(`Erro ao adicionar o usuário a mesa: ${err}`);
      this.exception.controllerExceptionHandler(err);
    }
  }
}
