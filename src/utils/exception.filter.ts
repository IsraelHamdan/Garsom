/* eslint-disable prettier/prettier */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: FastifyReply = ctx.getResponse();
    const request: FastifyRequest = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    this.logger.error({
      statusCode: status,
      message,
      method: request.method,
      path: request.url,
    });

    response.status(status).send({
      statusCode: status,
      message: typeof message === 'string' ? message : 'Erro inesperado.',
    });
  }
}
