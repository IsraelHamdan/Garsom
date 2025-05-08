/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';

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
      secretOrKey: jwtKey
    });
  }

   validate(payload: { sub: string; email: string }): unknown {
    return { userId: payload.sub, email: payload.email };
  }
}