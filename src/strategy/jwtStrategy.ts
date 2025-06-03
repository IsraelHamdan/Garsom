/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokenPayload } from 'src/DTO/token/tokenPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    const jwtKey = config.get<string>('JWT_KEY');
    if (!jwtKey) {
      throw new Error('JWT_KEY is not defined in the configuration.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtKey,
    });
  }

  validate(payload: JwtPayload): TokenPayload {
    const userId = payload.userId;
    if (!userId) {
      throw new UnauthorizedException(
        'Token inválido: ID do usuário não encontrado',
      );
    }
    return { userId, email: payload.email };
  }
}
