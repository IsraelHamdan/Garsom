/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/DTO/user/createUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { updateUserDTO } from 'src/DTO/user/updateUserDTO';
import { Prisma, User } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  prismaError,
} from 'prisma-better-errors';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/repositories/user.repository';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { throws } from 'assert';
import { TokenService } from '../token/token.service';
import { CreateTokenDTO } from 'src/DTO/token/createToken.dto';
import { UpdatePasswordDTO } from 'src/DTO/user/updatePassword.dto';
import passport from 'passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRespository: UserRepository,
    private readonly exception: ExceptionHandler,
    private readonly token: TokenService,
  ) {}

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.userRespository.createUser({
        ...data,
        password: hashedPassword,
      });

      const tokenPayload = {
        userId: user.id,
        email: user.email,
      };

      const token = await this.token.generateAccessToken(tokenPayload);
      if (!token) throw new Error('Erro ao gerar o token');

      return {
        ...user,
        token: token,
      };
    } catch (err) {
      console.error('Erro no Controller:', err);
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  async updateUser(id: string, data: updateUserDTO): Promise<UserResponseDTO> {
    try {
      return (await this.userRespository.updateUser(
        data,
        id,
      )) as UserResponseDTO;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        console.error(err.message);
      }
      if (err instanceof NotFoundException) {
        console.error(err.message);
      }
      if (err instanceof BadRequestException) {
        console.error(err.message);
      }
      throw new InternalServerErrorException(
        `Erro não identificado no serive: ${err}`,
      );
    }
  }
  async updateProfilePhoto(
    id: string,
    photoURL: string,
    // token: string,
  ): Promise<UserResponseDTO> {
    try {
      // const isValidToken = this.token.verifyToken(token);
      // if (isValidToken) throw new Error('Token invalido');
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      if (!user) throw new BadRequestException(`Usuário não encontrado`);
      return (await this.userRespository.updateProfilePhoto(
        user.id,
        photoURL,
      )) as UserResponseDTO;
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  async findUser(id: string): Promise<UserResponseDTO | null> {
    try {
      const user = await this.userRespository.findUser(id);
      return user as UserResponseDTO;
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  async findAllUsers(): Promise<UserResponseDTO[] | null> {
    try {
      return this.userRespository.findMany();
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  async updatePassword(
    id: string,
    data: UpdatePasswordDTO,
  ): Promise<UserResponseDTO | null> {
    try {
      console.log(`Senha antiga: ${data.oldPassword}`);
      console.log(`Nova senha: ${data.newPassword}`);
      const isPasswordValid = await this.isValidPassword(data.oldPassword, id);
      if (!isPasswordValid)
        throw new BadRequestException(
          'As senha fonrnecida não é igual ao salvo',
        );

      const hashedPassword = bcrypt.hashSync(data.newPassword, 10);

      return await this.userRespository.updatePassword(hashedPassword, id);
    } catch (err) {
      console.error(err);
      if (err instanceof PrismaClientKnownRequestError)
        throw new prismaError(err);
      throw new InternalServerErrorException(
        `Erro inesperado no servidor: ${err}`,
      );
    }
  }

  async findUserByEmail(email: string): Promise<UserResponseDTO | null> {
    try {
      const user = await this.userRespository.findByEmail(email);
      if (!user)
        throw new NotFoundException(
          `Não foi possivel encontrar o usuário com o email: ${email}`,
        );
      return user;
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }

  private validateToken(token: string): boolean {
    try {
      return this.token.verifyToken(token);
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  private async isValidPassword(
    passwordToCompare: string,
    userId: string,
  ): Promise<boolean> {
    try {
      const user = await this.userRespository.findUser(userId);
      if (!user)
        throw new NotFoundException(
          'Usuário especificado não encontrado para verificação de senha',
        );
      if (!user.password) {
        throw new BadRequestException('Não foi possível comparar as senhas');
      }
      const isValidPassword = await bcrypt.compare(
        passwordToCompare,
        user.password,
      );
      if (!isValidPassword) return false;
      return true;
    } catch (err) {
      console.error(`Erro ao validar as senhas ${err}`);
      return false;
    }
  }

  async deleteEveryone() {
    try {
      await this.userRespository.deleteEveryone();
    } catch (err) {
      console.error(`Erro ao deletar todos os usuários: ${err}`);
      this.exception.serviceExceptionHandler(err as Error);
    }
  }
}
