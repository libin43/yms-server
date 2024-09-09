import { Injectable } from '@nestjs/common';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VehicleService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  create(createVehicleInput: CreateVehicleInput) {
    return this.prismaService.vehicle.create({
     data: {
      make: createVehicleInput.make,
      model: createVehicleInput.model,
      colour: createVehicleInput.colour,
     } 
    })
  }

  findAll() {
    return this.prismaService.vehicle.findMany({
      select: {
        id: true,
        make: true,
        model: true,
        colour: true,
        createdAt: true,
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleInput: UpdateVehicleInput) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
