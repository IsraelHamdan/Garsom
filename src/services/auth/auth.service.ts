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
import { CreateUserDTO } from 'src/DTO/user/createUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly token: TokenService,
    private user: UserService,
    private readonly exception: ExceptionHandler,
    private readonly userRespository: UserRepository,
  ) {}

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = { ...data, password: hashedPassword };

      return (await this.userRespository.createUser(
        newUser,
      )) as UserResponseDTO;
    } catch (err) {
      console.error('Erro no Controller:', err);
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  async login(data: LoginDTO): Promise<UserResponseDTO> {
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

      const accessToken = this.token.generateAccessToken({
        userId: user.id,
        email: user.email,
      });
      return {
        ...user,
        token: accessToken,
      };
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }
}
