import { Module } from '@nestjs/common';
import { YardService } from './yard.service';
import { YardResolver } from './yard.resolver';
import { PrismaService } from 'src/prisma.service';
import { FirebaseAuthService } from 'auth/firebase/firebase-auth.service';

@Module({
  providers: [YardService, YardResolver, PrismaService, FirebaseAuthService]
})
export class YardModule {}
