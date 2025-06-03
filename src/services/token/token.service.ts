/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDTO } from 'src/DTO/token/createToken.dto';
import { ExceptionHandler } from 'src/utils/exceptionHandler';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly exception: ExceptionHandler,
  ) {}

  async generateAccessToken(data: CreateTokenDTO): Promise<string> {
    console.log('🚀 ~ TokenService ~ generateAccessToken ~ data:', data);
    try {
      const accessToken = await this.jwtService.signAsync(data);
      return accessToken;
    } catch (err) {
      console.error(err);
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
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
      return this.jwtService.decode(token);
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }
}
