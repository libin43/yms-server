import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { PrismaClientExceptionFilter } from './exception-filters/prisma-exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: true,
    origin: 'https://sandbox.embed.apollographql.com',
  })

  app.use(cookieParser());

  app.useGlobalFilters(new PrismaClientExceptionFilter()) //Prisma exception filter used globally
  
  await app.listen(3000);
}
bootstrap();
