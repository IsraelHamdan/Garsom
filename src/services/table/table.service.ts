/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  private generateUniqueCode(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  private async isCodeUnique(code: string): Promise<boolean> {
    const existingTable = await this.prisma.table.findUnique({
      where: { code },
    });
    return !existingTable;
  }

  // async createTable(data: CreateTableDTO): Promise<TableResponseDTO> {
  //   try {
  //     let code = this.generateUniqueCode();
  //     let attempts = 0; // Contador de tentativas
  //     const maxAttempts = 5; // Limite de tentativas

  //     while (!(await this.isCodeUnique(code))) {
  //       if (attempts >= maxAttempts) {
  //         throw new InternalServerErrorException(
  //           'Não foi possível gerar um código único para a mesa após várias tentativas.',
  //         );
  //       }
  //       code = this.generateUniqueCode();
  //       attempts++;
  //     }

  //     const Mesa = await this.prisma.table.create({
  //       data: {
  //         name: data.name,
  //         userId: data.userId,
  //         code: code,
  //       },
  //       include: {
  //         Client: true,
  //         Product: true,
  //         createdBy: true,
  //         User: true,
  //       },
  //     });
  //     return {
  //       id: Mesa.id,
  //       name: Mesa.name,
  //       code: Mesa.code,
  //       createdBy: Mesa.createdBy,
  //       clients: Mesa.Client,
  //       products: Mesa.Product,
  //       user: Mesa.User,
  //     };
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       throw new prismaError(error);
  //     }
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
