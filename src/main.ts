/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Mesa Redonda')
    .setDescription('Endpoints da api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('mesa', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);
  await app.listen(3001);
}
bootstrap();
