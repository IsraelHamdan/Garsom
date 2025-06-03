/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';

@Module({
  imports: [
    ConfigModule,
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get<string>('LOG_LEVEL', 'debug'), // Define o nível de log
          transport:
            configService.get<string>('NODE_ENV') !== 'production'
              ? {
                  target: 'pino-pretty',
                  options: { colorize: true },
                }
              : undefined,
          serializers: {
            req(req: FastifyRequest) {
              // Filtra informações sensíveis do request
              return {
                method: req.method,
                url: req.url,
                headers: req.headers,
              };
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [PinoLoggerModule], // Exporta o módulo para uso em outros locais
})
export class LoggerModule {}
