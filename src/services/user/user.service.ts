/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from 'src/DTO/user/createUserDTO';
import { UserResponseDTO } from 'src/DTO/user/userResponseDTO';
import { updateUserDTO } from 'src/DTO/user/updateUserDTO';
import { Prisma } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  prismaError,
} from 'prisma-better-errors';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/repositories/user.repository';
import { ExceptionHandler } from 'src/utils/exceptionHandler';
import { throws } from 'assert';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRespository: UserRepository,
    private readonly exception: ExceptionHandler,
  ) {}

  async updateUser(id: string, data: updateUserDTO): Promise<UserResponseDTO> {
    try {
      return await this.userRespository.updateUser(data, id) as UserResponseDTO;
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  // melhoria para o futuro, adicionar lógica de verifcação do token
  async updateProfilePhoto(
    id: string,
    photoURL: string,
  ): Promise<UserResponseDTO> {
    try {
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
      const user = await this.userRespository.findOne(id);
      return user as UserResponseDTO;
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  async updatePassword(
    id: string,
    newPassword: string,
    oldPassword: string,
    confirmNewPassword: string,
  ): Promise<UserResponseDTO> {
    try {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword as UserResponseDTO;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError)
        throw new prismaError(err);
      throw new InternalServerErrorException(
        `Erro inesperado no servidor: ${err}`,
      );
    }
  }

  // async findAllUsers(): Promise<UserResponseDTO[] | null> {
  //   try {
  //     return await this.userRespository.findMany();
  //   } catch (err) {
  //     this.exception.serviceExceptionHandler(err as Error);
  //   }
  // }

  async findUserByEmail(email: string): Promise<UserResponseDTO | null> {
    try {
      const user = await this.userRespository.findByEmail(email);
      if (!user)
        throw new NotFoundException(
          `Não foi possivel encontrar o usuário com o email: ${email}`,
        );
      return user as UserResponseDTO;
    } catch (err) {
      this.exception.serviceExceptionHandler(err as Error);
    }
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
