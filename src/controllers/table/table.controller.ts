/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  ConflictException,
} from '@nestjs/common';
import { TableService } from 'src/services/table/table.service';
import { CreateTableDTO } from 'src/DTO/table/createTableDTO';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  // @Post()
  // async createTable(@Body() data: CreateTableDTO): Promise<TableResponseDTO> {
  //   try {
  //     return await this.tableService.createTable(data);
  //   } catch (err) 
  //     if (err instanceof ConflictException) {
  //       throw new ConflictException('O código da mesa já existe.');
  //     }
  //     throw new InternalServerErrorException(err);
  //   }
  // }
}
