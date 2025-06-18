/* eslint-disable prettier/prettier */
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TableParticipantsResponseDTO } from 'src/DTO/table/tableParticipantsResponseDTO';
import { UpdateTableDTO } from 'src/DTO/table/updateTabele';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableRepository {
  constructor(
    private exception: ExceptionHandler,
    private readonly prisma: PrismaService,
  ) {}

  async createNewTable(table: {
    name: string;
    userId: string;
    code: string;
  }): Promise<Omit<TableResponseDTO, 'link'>> {
    try {
      return await this.prisma.table.create({ data: table });
    } catch (err) {
      console.error(`Erro do repository ao criar nova mesa: ${err}`);
      this.exception.repositoryExceptionHandler(err);
      throw new InternalServerErrorException('Erro ao criar nova mesa');
    }
  }

  async findTableByCode(code: string): Promise<TableResponseDTO | null> {
    try {
      const table = await this.prisma.table.findUnique({
        where: { code: code },
      });
      if (!table)
        throw new NotFoundException(
          'Mesa não encontrada para adicionar o usuário',
        );
      return table;
    } catch (err) {
      console.error(`Erro do repository ao criar nova mesa: ${err}`);
      const errorMessage =
        err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      throw new InternalServerErrorException(
        `Erro ao criar mesa: ${errorMessage}`,
      );
    }
  }

  async addUserOnTable(
    tableId: string,
    userId: string,
  ): Promise<TableParticipantsResponseDTO> {
    try {
      return await this.prisma.tableParticipants.create({
        data: {
          tableId,
          userId,
        },
      });
    } catch (err) {
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async findAllTabes(): Promise<TableResponseDTO[] | null> {
    try {
      const tables = await this.prisma.table.findMany();
      if (!tables) throw new NotFoundException(`Messas não encontradas`);
      return tables;
    } catch (err) {
      console.log('Erro ao buscar todas as mesas');
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async findTableById(tableId: string): Promise<TableResponseDTO> {
    console.log('🚀 ~ TableRepository ~ findTableById ~ tableId:', tableId);
    try {
      const table = await this.prisma.table.findUnique({
        where: { id: tableId },
      });
      if (!table) {
        throw new NotFoundException(
          'Não foi possível encontrar a mesa pelo id',
        );
      }
      return table;
    } catch (err) {
      console.log('Erro ao encontrar mesa: ${err}');
      this.exception.repositoryExceptionHandler(err);
    }
  }

  private async isParticipant(
    tableId: string,
    userId: string,
  ): Promise<boolean> {
    try {
      const participant = await this.prisma.tableParticipants.findUnique({
        where: {
          userId_tableId: { userId, tableId },
        },
      });
      return !!participant;
    } catch (err) {
      console.error(
        `Erro ao verificar se o participante já esta na mesa: ${err}`,
      );
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async updateTable(
    data: UpdateTableDTO,
    code: string,
  ): Promise<TableResponseDTO> {
    try {
      return await this.prisma.table.update({
        where: { code },
        data: { ...data },
      });
    } catch (err) {
      console.error(`Erro ao tentar atualizar mesa: ${err}`);
      this.exception.repositoryExceptionHandler(err);
    }
  }

  async deleteTable(code: string) {
    try {
      return await this.prisma.table.delete({
        where: { code },
      });
    } catch (err) {
      console.error(`Erro ao tentar atualizar mesa: ${err}`);
      this.exception.repositoryExceptionHandler(err);
    }
  }
}
