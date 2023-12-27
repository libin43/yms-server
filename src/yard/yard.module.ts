import { Module } from '@nestjs/common';
import { YardService } from './yard.service';
import { YardResolver } from './yard.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [YardService, YardResolver, PrismaService]
})
export class YardModule {}
