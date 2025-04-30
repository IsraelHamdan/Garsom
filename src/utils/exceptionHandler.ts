/* eslint-disable prettier/prettier */
import {
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  prismaError,
} from 'prisma-better-errors';

@Injectable()
export class ExceptionHandler {
  repositoryExceptionHandler(
    err: PrismaClientKnownRequestError | Error,
  ): never {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2002':
          throw new BadRequestException('Registro duplicado detectado.');
        case 'P2025':
          throw new NotFoundException('Registro não encontrado.');
        default:
          throw new prismaError(err);
      }
    }
    throw new InternalServerErrorException(`Erro inesperado no DB: ${err}`);
  }

  controllerExceptionHandler(
    err: Error | BadRequestException | NotFoundException,
  ): never {
    if (
      err instanceof BadRequestException ||
      err instanceof NotFoundException
    ) {
      throw err; // Repassa exceções já tratadas no repositório
    }
    throw new InternalServerErrorException(
      `Erro inesperado no controller: ${err.message || err}`,
    );
  }

  serviceExceptionHandler(err: Error): never {
    if (
      err instanceof BadRequestException ||
      err instanceof NotFoundException
    ) {
      throw err; // Repassa exceções já tratadas no repositório ou controller
    }
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2002':
          throw new BadRequestException('Registro duplicado detectado.');
        case 'P2025':
          throw new NotFoundException('Registro não encontrado.');
        default:
          throw new prismaError(err); // Trata outros erros do Prisma
      }
    }
    throw new InternalServerErrorException(
      `Erro inesperado no serviço: ${err.message || err}`,
    );
  }
}
