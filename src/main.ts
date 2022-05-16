import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      allowedHeaders: '*',
    },
  });

  const config = new DocumentBuilder()
    .setTitle('SOSU-Backend')
    .setDescription('SOSU Backend API for use with Angular and Android Studio')
    .setVersion('1.0')
    .addTag('SOSU')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
