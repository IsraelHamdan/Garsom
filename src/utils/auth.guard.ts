/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from 'src/DTO/token/tokenPayload';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  /**
   * Manipula o resultado da validação do JWT
   * @param err Erro de autenticação, se houver
   * @param user Usuário autenticado retornado pela strategy
   * @param info Informações adicionais sobre falhas de autenticação
   * @returns O objeto de usuário validado e tipado
   */
  handleRequest<TUser = TokenPayload>(err: any, user: any, info: any): TUser {
    // Se houver erro ou não houver usuário, lança uma exceção
    if (err || !user) {
      console.error('Erro no JwtGuard:', err || info);
      throw err || new UnauthorizedException('Autenticação falhou');
    }

    // Verificações de tipo em runtime para maior segurança
    if (typeof user === 'object' && user !== null) {
      if (!('userId' in user) || !('email' in user)) {
        console.error('Objeto user incompleto:', user);
        throw new UnauthorizedException('Token inválido ou mal-formado');
      }
    }

    // Retorna o usuário mantendo a tipagem genérica exigida pela interface
    return user as TUser;
  }
}
