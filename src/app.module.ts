/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TablesModule } from './modules/tables/tables.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGlobalModule } from './modules/auth/jwtGlobal.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TablesModule,
    AuthModule,
    JwtGlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
