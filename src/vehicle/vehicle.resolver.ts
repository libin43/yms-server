import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
// import { PubSub } from 'graphql-subscriptions';
import { PubSubService } from 'src/services/redis/pubsub.service';

// const pubSub = new PubSub()

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly pubsubService: PubSubService
  ) {}

  @Mutation(() => Vehicle)
  async createVehicle(@Args('createVehicleInput') createVehicleInput: CreateVehicleInput) {
    const vehicle = await this.vehicleService.create(createVehicleInput)
    console.log(vehicle);
    
    // pubSub.publish('VEHICLE_ADDED_EVENT',{vehicleAdded: vehicle})
    this.pubsubService.publish('VEHICLE_ADDED_EVENT',{vehicleAdded: vehicle})
    return vehicle
  }

  @Query(() => [Vehicle], { name: 'allVehicles' })
  findAll() {
    return this.vehicleService.findAll()
  }

  @Subscription(() => Vehicle, {
    name: 'subscriptionAllVehicles',
    resolve: (payload) => payload.vehicleAdded, 
  })
  findAllVehicle() {
    // return pubSub.asyncIterator('VEHICLE_ADDED_EVENT')
    return this.pubsubService.asyncIterator('VEHICLE_ADDED_EVENT')
  }

  @Query(() => Vehicle, { name: 'vehicle' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.findOne(id);
  }

  @Mutation(() => Vehicle)
  updateVehicle(@Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput) {
    return this.vehicleService.update(updateVehicleInput.id, updateVehicleInput);
  }

  @Mutation(() => Vehicle)
  removeVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.remove(id);
  }
}
