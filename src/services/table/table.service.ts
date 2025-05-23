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
import { JoinOnTableDTO } from 'src/DTO/table/joinOnTable';
import { UserService } from '../user/user.service';
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

  // async joinOnTable(data: JoinOnTableDTO): Promise<TableResponseDTO> {
  //   try {
  //     const table = await this.tableRepository.findTableByCode(data.code);
  //     if (!table)
  //       throw new NotFoundException(
  //         'Mesa não retornada para juntar o usuário a ela',
  //       );

  //     const user = await this.user.findUser(data.userId);
  //     if (!user) throw new NotFoundException();
  //   } catch (err) {
  //     console.error(`Erro ao tentar unir o usuário à mesa: ${err}`);
  //     this.exception.serviceExceptionHandler(err);
  //   }
  // }
}
