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
    async addYard(@Args('input') data) {
        try{
            return this.yardService.createYard(data)
        } catch (error) {
            console.log(error, 'error in resolver');
            
        }
    }

    @Mutation()
    async updateYard(@Args('id') id: number, @Args('email') email: string) {
        return this.yardService.modifyYardEmail(id, email)
    }

}
