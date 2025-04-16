/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { CreateTokenDTO } from 'src/DTO/token/createToken.dto';
import { ExceptionHandler } from 'src/utils/exceptionHandler';

@Injectable()
export class TokenService {
  constructor(
    private readonly token: JwtService,
    private readonly exception: ExceptionHandler,
    private readonly prisma: PrismaClient,
  ) {}

  generateAccessToken(data: CreateTokenDTO): string {
    try {
      return this.token.sign(data, { expiresIn: '24h' });
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  verifyToken(token: string): any {
    try {
      return this.token.verify(token);
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  decodeToken(token: string): any {
    if (!token)
      this.exception.serviceExceptionHandler(
        new Error('Token não fornecido para decodificação'),
      );
    try {
      return this.token.decode(token);
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  // async invalidateToken(data: CreateTokenBlacklistDTO): Promise<void> {
  //   try {
  //     const user = await this.prisma.user.findFirst({where: {id: data.userId}})
  //     if(!user) throw new NotFoundException('Usuário não encontrado para invalidar')
  //     await this.prisma.tokenBlacklist.create({
  //       data: {
  //         token: data.token,
  //         userId: data.userId,
  //         expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  //         user: { connect: { id: data.userId } }
  //       },
  //     });
  //   } catch (err: unknown) {
  //     if (err instanceof Error) this.exception.serviceExceptionHandler(err);
  //   }
  // }
}
