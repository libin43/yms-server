import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { YardService } from './yard.service';
import { Cookies } from 'src/common/decorators/cookie.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Roles } from 'src/common/decorators/role.decorator';

@Resolver('Yard')
export class YardResolver {

    constructor(
        private yardService: YardService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Query()
    async getYard(
        @Args('id') id: number,
        @Cookies() cookies: any,
        @Context() {req},
        @Roles(['yard']) hasPermission: boolean,

        ) {
            console.log(req.user,'from context');
            console.log(hasPermission,'got from role decor');
            
            // console.log(req.headers.authorization,'req object in get yard');
            
            console.log('Received Cookies:', cookies);
        return this.yardService.findOneById(id)
    }

    @Query()
    async getAllYard() {
        console.log('hitting');
        return this.yardService.findAllYard()
    }


    // @Mutation()
    // async signup(@Args('input') data) {
    //     return this.yardService.createYard(data)
    // }

    // @Mutation()
    // async login(@Args('input') data) {
    //     return this.yardService.verifyUser(data)
    // }

    @Mutation()
    async updateYard(@Args('id') id: number, @Args('email') email: string) {
        return this.yardService.modifyYardEmail(id, email)
    }

    // @Mutation()
    // async signOut() {
    //     return this.yardService.signOutUser();
    // }

}
