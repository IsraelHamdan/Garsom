/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';
function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Mesa Redonda')
    .setDescription('Endpoints da api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV === 'dev') {
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  }
  SwaggerModule.setup('mesa', app, document, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tryItOutEnabled: true,
      displayRequestDuration: true,
      persistAuthorization: true,
      responseInterceptor: (res: Record<string, any>) => {
        console.log('Swagger response intercepted');
        return res;
      },
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors();
  setupSwagger(app);
  await app.listen(3001);
}
bootstrap();
