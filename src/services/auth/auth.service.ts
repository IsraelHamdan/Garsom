/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { LoginDTO } from 'src/DTO/user/login.dto';
import { UserService } from '../user/user.service';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import * as bcrypt from 'bcrypt';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { CreateTokenDTO } from 'src/DTO/token/createToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly token: TokenService,
    private user: UserService,
    private readonly exception: ExceptionHandler,
  ) {}

  async login(data: LoginDTO): Promise<Omit<UserResponseDTO, 'password'>> {
    try {
      const user = await this.user.findUserByEmail(data.email);
      if (!user) throw new NotFoundException(`Usuário não encontrado`);
      if (!user.password)
        throw new InternalServerErrorException('Senha não encontrada');

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!isPasswordValid)
        throw new NotFoundException(`Credenciais inválidas`);
      const tokenPayload: CreateTokenDTO = {
        email: user.email,
        userId: user.id,
      };

      const token = await this.user.updateToken(tokenPayload, user.id);
      return {
        ...user,
        token: token,
      };
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  // async logout(token: string): Promise<void> {
  //   try {
  //     const destroyToken = await this.token.
  //   } catch (err) {
  //     console.error(err);
  //     this.exception.serviceExceptionHandler(err as Error);
  //   }
  // }
}
