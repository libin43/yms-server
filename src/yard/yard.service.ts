import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { yard, Prisma } from '@prisma/client';
import { FirebaseAuthService } from 'auth/firebase/firebase-auth.service';


@Injectable()
export class YardService {
    constructor(private prisma: PrismaService, private readonly firebaseAuthService: FirebaseAuthService) {}

    async createYard(data: Prisma.yardCreateInput) {
        console.log(this.firebaseAuthService,'hi');
        
        const userCredential = await this.firebaseAuthService.signupWithEmailAndPassword(
            data?.yard_email,
            data?.password,
        )
        console.log(userCredential,'singup credential');
        
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

    async verifyUser(data) {
        console.log(data);

        const userCredential = await this.firebaseAuthService.signInWithEmailAndPassword(
            data?.yard_email,
            data?.password,
        )
        if(userCredential){
            console.log(userCredential);
        }
        console.log('nexxttt');
        
    }
}
