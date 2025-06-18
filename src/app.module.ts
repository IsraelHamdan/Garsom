/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TableModule } from './modules/tables/tables.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGlobalModule } from './modules/auth/jwtGlobal.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './modules/product/product.module';
import { ExceptionModule } from './modules/exception.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerModule } from './modules/pino/pino.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TableModule,
    AuthModule,
    JwtGlobalModule,
    ProductModule,
    ExceptionModule,
    PrismaModule,
    // LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
