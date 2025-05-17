/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateTableDTO } from 'src/DTO/table/createTableDTO';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import { TableRepository } from 'src/repositories/tabele.repository';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TableService {
  constructor(
    private readonly tableRepository: TableRepository,
    private readonly config: ConfigService,
  ) {}

  async createTable(
    data: CreateTableDTO,
    userId: string,
  ): Promise<TableResponseDTO> {
    try {
      const code: string = nanoid(8);

      const newTable = await this.tableRepository.createNewTable({
        name: data.name,
        userId: userId,
        code: code,
      });
      const tableResponse: TableResponseDTO = {
        ...newTable,
        link: `${this.config.get<string>('CLIENT_URL_DEV')}/${code}`,
      };
      return tableResponse;
    } catch (err) {
      console.error(`Erro do controller ao criar mesa: ${err}`);
      throw new InternalServerErrorException(`Erro ao criar mesa: ${err}`);
    }
  }
}
