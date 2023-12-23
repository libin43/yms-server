import { Module } from '@nestjs/common';
import { YardService } from './yard.service';
import { YardResolver } from './yard.resolver';

@Module({
  providers: [YardService, YardResolver]
})
export class YardModule {}
