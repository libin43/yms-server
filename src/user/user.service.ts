import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  create(createUserInput: CreateUserInput) {
    return this.prismaService.user.create({
      data: {
        fname: createUserInput.fname,
        lname: createUserInput.lname,
        contact: createUserInput.contact,
        role: createUserInput.role,
      }
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
