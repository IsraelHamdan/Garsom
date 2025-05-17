/* eslint-disable prettier/prettier */
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class TableRepository {
  constructor(
    private exception: ExceptionHandler,
    private readonly prisma: PrismaService,
  ) {
    console.log('PrismaService no TableRepository:', !!this.prisma);
  }

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
      const errorMessage =
        err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      throw new InternalServerErrorException(
        `Erro ao criar mesa: ${errorMessage}`,
      );
    }
  }

  async deleteAllTables() {
    try {
      return await this.prisma.table.deleteMany();
    } catch (err) {
      console.error(`Erro ao deletar tudo: ${err}`);
      this.exception.repositoryExceptionHandler(err);
    }
  }
}
