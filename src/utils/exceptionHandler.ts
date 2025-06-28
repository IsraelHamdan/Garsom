/* eslint-disable prettier/prettier */
import {
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  prismaError,
} from 'prisma-better-errors';

@Injectable()
export class ExceptionHandler {
  private logError(err: Error, context: string): void {
    console.error(`[${context}] - ${err.message}`);
  }

  private ensureError(err: unknown): Error {
    if (err instanceof Error) {
      return err;
    }
    return new Error(String(err));
  }

  private handlePrismaError(err: PrismaClientKnownRequestError): never {
    switch (err.code) {
      case 'P2002':
        throw new BadRequestException('Registro duplicado detectado.');
      case 'P2025':
        throw new BadRequestException('Registro duplicado detectado.');
      case 'P2003':
        throw new BadRequestException('Violação de chave estrangeira.');
      case 'P2016':
        throw new NotFoundException('Registro necessário não foi encontrado.');
      case 'P2018': // Relation validation failed
        throw new BadRequestException('Validação de relação falhou.');
      case 'P2024':
      default:
        throw new prismaError(err);
    }
  }

  private handleKnownError(err: Error): never {
    if (
      err instanceof BadRequestException ||
      err instanceof NotFoundException ||
      err instanceof UnauthorizedException
    ) {
      throw err;
    }
    throw new InternalServerErrorException(
      `Erro inesperado: ${err.message || err}`,
    );
  }

  repositoryExceptionHandler(err: unknown): never {
    const error = this.ensureError(err);
    this.logError(error, 'Repository');
    if (error instanceof PrismaClientKnownRequestError) {
      this.handlePrismaError(error);
    }
    this.handleKnownError(error);
  }

  controllerExceptionHandler(err: unknown): never {
    const error = this.ensureError(err);
    this.logError(error, 'Controller');
    this.handleKnownError(error);
  }

  serviceExceptionHandler(err: unknown): never {
    const error = this.ensureError(err);
    this.logError(error, 'Service');

    this.handleKnownError(error);
  }
}
