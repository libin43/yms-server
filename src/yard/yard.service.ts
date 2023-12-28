import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { yard, Prisma } from '@prisma/client';

@Injectable()
export class YardService {
    constructor(private prisma: PrismaService) {}

    async createYard(data: Prisma.yardCreateInput) {
        
        return this.prisma.yard.create({
            data,
        })
    }

    async modifyYardEmail(id: number, email: string) {
        
        return this.prisma.yard.update({
            where: {id},
            data: email,
        })
    }

    async findOneById(id: number) {
        return this.prisma.yard.findUnique({
            where: {id}
        })
    }

    async findAllYard() {
         console.log('hit in service');
         
        return this.prisma.yard.findMany();
    }
}
