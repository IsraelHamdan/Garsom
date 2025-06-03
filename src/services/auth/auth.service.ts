/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

  private async isValidCredentials(
    email: string,
    password: string,
  ): Promise<UserResponseDTO | null> {
    try {
      const user = await this.user.findUserByEmail(email);
      if (!user || !user.password) {
        throw new UnauthorizedException('Email ou senha incorretos');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        throw new NotFoundException(`Credenciais inválidas`);

      return user;
    } catch (err) {
      this.exception.serviceExceptionHandler(err);
    }
  }

  async login(data: LoginDTO): Promise<Omit<UserResponseDTO, 'password'>> {
    try {
      const user = await this.isValidCredentials(data.email, data.password);
      if (!user) throw new NotFoundException(`Usuário não encontrado`);

      const tokenPayload: CreateTokenDTO = {
        email: user.email,
        userId: user.id,
      };

      const token = await this.token.generateAccessToken(tokenPayload);
      return {
        ...user,
        token: token,
      };
    } catch (err) {
      this.exception.serviceExceptionHandler(err);
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
