import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { YardService } from './yard.service';

@Resolver('Yard')
export class YardResolver {

    constructor(
        private yardService: YardService,
    ) { }

    @Query()
    async getYard(@Args('id') id: number) {
        return this.yardService.findOneById(id)
    }

    @Query()
    async getAllYard() {
        console.log('hitting');
        
        return this.yardService.findAllYard()
    }


    @Mutation()
    async login(@Args('input') data) {
        
        return this.yardService.verifyUser(data)
    }

    @Mutation()
    async signup(@Args('input') data) {
        return this.yardService.createYard(data)
    }

    @Mutation()
    async updateYard(@Args('id') id: number, @Args('email') email: string) {
        return this.yardService.modifyYardEmail(id, email)
    }

}
