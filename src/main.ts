import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from './exception-filters/prisma-exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptions = {
    "origin": "http://localhost:3001",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": "Content-Type,Authorization",
    "credentials": true,
  }

  app.enableCors(corsOptions)
  // app.enableCors({
  //   credentials: true,
  //   origin: 'https://sandbox.embed.apollographql.com',
  // })

  app.use(cookieParser());

  app.useGlobalFilters(new PrismaClientExceptionFilter()) //Prisma exception filter used globally
  
  await app.listen(3000);
}
bootstrap();
