/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTableDTO } from 'src/DTO/table/createTableDTO';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';

import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { TableRepository } from 'src/repositories/table.repository';
import { UserService } from '../user/user.service';
import { TableParticipantsResponseDTO } from 'src/DTO/table/tableParticipantsResponseDTO';
import { UpdateTableDTO } from 'src/DTO/table/updateTabele';

@Injectable()
export class TableService {
  constructor(
    private tableRepository: TableRepository,
    private readonly config: ConfigService,
    private exception: ExceptionHandler,
    private readonly user: UserService,
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

  async joinOnTable(
    userId: string,
    code: string,
  ): Promise<TableParticipantsResponseDTO> {
    try {
      const table = await this.tableRepository.findTableByCode(code);
      if (!table)
        throw new NotFoundException(
          'Mesa não retornada para juntar o usuário a ela',
        );

      const user = await this.user.findUser(userId);
      if (!user) throw new NotFoundException('Usuário não encontrado');

      return await this.tableRepository.addUserOnTable(table.id, user.id);
    } catch (err) {
      console.error(`Erro ao tentar unir o usuário à mesa: ${err}`);
      this.exception.serviceExceptionHandler(err);
    }
  }

  async findUniqueTable(code: string): Promise<TableResponseDTO | null> {
    try {
      const table = await this.tableRepository.findTableByCode(code);
      if (!table)
        throw new NotFoundException('Service: não encontrei a mesa não');
      return table;
    } catch (err) {
      console.error(`Erro ao tentar encontrar mesa: ${err}`);
      this.exception.serviceExceptionHandler(err);
    }
  }

  async findAllTables(): Promise<TableResponseDTO[] | null> {
    try {
      const tables = await this.tableRepository.findAllTabes();
      if (!tables) throw new NotFoundException();
      return tables;
    } catch (err) {
      console.error(`Erro ao buscar as mesas: ${err}`);
      this.exception.serviceExceptionHandler(err);
    }
  }

  async updateTable(
    data: UpdateTableDTO,
    code: string,
  ): Promise<TableResponseDTO> {
    try {
      const table = await this.tableRepository.findTableByCode(code);
      if (!table) {
        throw new NotFoundException(`Table with ID ${code} not found`);
      }

      if (Object.keys(data).length == 0) {
        throw new InternalServerErrorException(
          'No data provided to update the table',
        );
      } else {
        return await this.tableRepository.updateTable(data, code);
      }
    } catch (err) {
      console.error(`Erro ao tentar atualizar a mesa: ${err}`);
      this.exception.serviceExceptionHandler(err);
    }
  }
}
