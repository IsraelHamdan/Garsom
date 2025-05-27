/* eslint-disable prettier/prettier */
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JoinOnTableDTO } from 'src/DTO/table/joinOnTable';

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
      const result = await this.prisma.table.create({ data: table });
      return result;
    } catch (err) {
      console.error(`Erro do repository ao criar nova mesa: ${err}`);
      this.exception.repositoryExceptionHandler(err);
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
  ): Promise<TableResponseDTO> {
    try {
      const participant = await this.prisma.tableParticipants.create({
        data: {
          tableId,
          userId,
        },
        include: {
          table: {
            include: {
              participants: true,
              Product: true,
              createdBy: true,
            },
          },
          user: true,
        },
      });
      const response: TableResponseDTO = {
        id: participant.table.id,
        name: participant.table.name,
        created_at: participant.table.created_at,
        updated_at: participant.table.updated_at,
        total: participant.table.total,
        userId: participant.table.userId,
        code: participant.table.code,
        createdBy: participant.table.createdBy,
      };
      return response;
    } catch (err) {
      this.exception.repositoryExceptionHandler(err);
    }
  }
}
