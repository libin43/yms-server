import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { yard, Prisma } from '@prisma/client';
// import { FirebaseAuthService } from 'auth/firebase/firebase-auth.service';


@Injectable()
export class YardService {
    constructor(private prisma: PrismaService) {}

    // async createYard(data: Prisma.yardCreateInput) {
        
    //     const userCredential = await this.firebaseAuthService.signupWithEmailAndPassword(
    //         data?.yard_email,
    //         data?.password,
    //     )
    //     console.log(userCredential,'singup credential');

        
    //     return this.prisma.yard.create({
    //         data,
    //     })
    // }

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

    async verifyUser(yard_email: string, password: string) {
        
        const user = await this.prisma.yard.findUnique({
            where: {
                yard_email,
                password,
            },
            select: {
                id: true,
                yard_name: true,
                role: true
            }
        })

        
         return {
            user
         }
        }
        
    }

    // async signOutUser() {
    //     return this.firebaseAuthService.signOut();
    // }

