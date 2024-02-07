import { HttpAdapterHost, NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppConfigService } from './app-config/app-config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

const start = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(AppConfigService);

  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new PrismaClientExceptionFilter(app.get(HttpAdapterHost).httpAdapter));
  app.useStaticAssets(config.SERVE_STATIC_PATH, { prefix: config.SERVE_STATIC_PREFIX });

  const documentConfig = new DocumentBuilder()
    .setTitle('Auction API')
    .addBearerAuth()
    .addCookieAuth(config.COOKIE_NAME, {
      type: 'apiKey',
      description: 'does not work in browser, use generated curl',
    })
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(config.PORT);

  Logger.log(`URL: ${await app.getUrl()}`, NestApplication.name);
};

start().then();
