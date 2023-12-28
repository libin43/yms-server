import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaClientExceptionFilter } from './exception-filters/prisma-exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new PrismaClientExceptionFilter()) //Prisma exception filter used globally
  
  await app.listen(3000);
}
bootstrap();
