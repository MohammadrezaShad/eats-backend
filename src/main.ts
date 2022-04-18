import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const PORT = process.env.PORT || 3000;
  const isDevelopment = process.env.NODE_ENV === 'dev';

  app.useStaticAssets(join(__dirname, '..', 'public', 'uploads'), {
    index: false,
    prefix: '/uploads',
  });
  app.use(graphqlUploadExpress());

  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cookieParser(),
    helmet({
      crossOriginEmbedderPolicy: !isDevelopment,
      contentSecurityPolicy: !isDevelopment,
    }),
  );

  await app.listen(PORT);
}
bootstrap();
