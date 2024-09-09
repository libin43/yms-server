import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';
import { PrismaService } from 'src/prisma.service';
import { PubSubService } from 'src/services/redis/pubsub.service';

@Module({
  providers: [VehicleResolver, VehicleService, PrismaService, PubSubService],
})
export class VehicleModule {}
