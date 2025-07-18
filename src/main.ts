/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fs from 'fs';
import { join } from 'path';
// import { Logger } from 'nestjs-pino';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { config } from 'dotenv';
import fastifyMultipart from '@fastify/multipart';

config();

const CSRF_KEY: string = process.env.CSRF_KEY || 'default_key';

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
    // customCssUrl: '../swagger/swagger-dark.css',
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
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'swagger'),
    prefix: '/swagger/',
  });
  // app.useLogger(app.get(Logger));
  setupSwagger(app);

  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'fonts.googleapis.com',
          'cdn.jsdelivr.net',
        ],
        fontSrc: ["'self'", 'fonts.gstatic.com', 'data:'],
        imgSrc: [
          "'self'",
          'data:',
          'cdn.jsdelivr.net',
          's3.amazonaws.com',
          'seu-bucket.s3.amazonaws.com',
        ],
        scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
        connectSrc: ["'self'", 'http://localhost:3001/'],
      },
    },
  });
  await app.register(fastifyCsrf);

  await app.register(fastifyCookie, {
    secret: CSRF_KEY,
  } as FastifyCookieOptions);

  
  await app.register(fastifyMultipart);




  await app.listen(3001);
}
bootstrap();
