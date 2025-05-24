/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TableModule } from './modules/tables/tables.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGlobalModule } from './modules/auth/jwtGlobal.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TableModule,
    AuthModule,
    JwtGlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
