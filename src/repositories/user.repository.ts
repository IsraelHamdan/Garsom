/* eslint-disable prettier/prettier */
import { CreateUserDTO } from 'src/DTO/user/createUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { PrismaClientKnownRequestError } from 'prisma-better-errors';
import { updateUserDTO } from 'src/DTO/user/updateUserDTO';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly exceptionHandler: ExceptionHandler,
  ) {}

  async createUser(
    data: CreateUserDTO,
  ): Promise<Omit<UserResponseDTO, 'token'>> {
    try {
      return await this.prisma.user.create({ data });
    } catch (err) {
      console.log('Erro no Repositório:', err);
      console.log('ExceptionHandler está definido?', this.exceptionHandler);
      this.exceptionHandler.repositoryExceptionHandler(
        err as PrismaClientKnownRequestError | Error,
      );
    }
  }

  async updateUser(
    data: updateUserDTO,
    id: string,
  ): Promise<Omit<UserResponseDTO, 'token' | 'password'>> {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new Error(`User with id ${id} not found`);
      }

      return await this.prisma.user.update({ where: { id }, data });
    } catch (err) {
      this.exceptionHandler.repositoryExceptionHandler(
        err as PrismaClientKnownRequestError | Error,
      );
    }
  }

  async updateProfilePhoto(
    userId: string,
    photoURL: string,
  ): Promise<Omit<UserResponseDTO, 'token' | 'password'>> {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { photoURL: photoURL },
      });
    } catch (err) {
      this.exceptionHandler.repositoryExceptionHandler(
        err as PrismaClientKnownRequestError | Error,
      );
    }
  }

  async findUser(id: string): Promise<UserResponseDTO | null> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });

      if (!user) throw new NotFoundException(`Usuário com ID não encontrado`);

      return user;
    } catch (err) {
      this.exceptionHandler.repositoryExceptionHandler(err as Error);
    }
  }

  async findMany(): Promise<Omit<
    UserResponseDTO[],
    'token' | 'password'
  > | null> {
    try {
      return (await this.prisma.user.findMany()) as UserResponseDTO[];
    } catch (err) {
      this.exceptionHandler.repositoryExceptionHandler(err as Error);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      this.exceptionHandler.repositoryExceptionHandler(
        err as PrismaClientKnownRequestError | Error,
      );
    }
  }

  async findByEmail(email: string): Promise<Omit<UserResponseDTO, 'token'>> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user)
        throw new NotFoundException(`Não foi possível encontrar o usuário`);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        photoURL: user.photoURL,
        tableId: user.tableId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (err) {
      this.exceptionHandler.repositoryExceptionHandler(err as Error);
    }
  }
}
