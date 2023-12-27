import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { yard, Prisma } from '@prisma/client';

@Injectable()
export class YardService {
    constructor(private prisma: PrismaService) {}

    async createYard(data: Prisma.yardCreateInput) {
        console.log('calling in service.............', data);
        
        return this.prisma.yard.create({
            data,
        })
    }

    async modifyYardEmail(id: number, email: string) {
        console.log('calling in update service.............', id, email);
        
        return this.prisma.yard.update({
            where: {id},
            data: {email},
        })
    }
}
