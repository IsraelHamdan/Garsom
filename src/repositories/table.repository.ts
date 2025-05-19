/* eslint-disable prettier/prettier */
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { TableResponseDTO } from 'src/DTO/table/tableResponseDTO';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class TableRepository {
  constructor(
    private exception: ExceptionHandler,
    private readonly prisma: PrismaService,
    private readonly user: UserService,
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

  // async joinOnTable(userId: string, code: string) {
  //   try {
  //     const table = await this.prisma.table.findUnique({
  //       where: { code: code },
  //     });
  //     if (!table) throw new NotFoundException(`Mesa não encontrada`);

  //     const updateUser = await this.user.updateUser(userId, {
  //       tableId: table.id,
  //     });
  //   } catch (err) {
  //     console.error(`Erro ao deletar tudo: ${err}`);
  //     this.exception.repositoryExceptionHandler(err);
  //   }
  // }

  async deleteAllTables() {
    try {
      return await this.prisma.table.deleteMany();
    } catch (err) {
      console.error(`Erro ao deletar tudo: ${err}`);
      this.exception.repositoryExceptionHandler(err);
    }
  }
}
