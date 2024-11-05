/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.enableCors();
  app.setGlobalPrefix('api'); // Préfixe global pour les routes

  app.useStaticAssets('uploads');
  app.use('/uploads', express.static('uploads'));

  await app.listen(3000);
}
bootstrap();