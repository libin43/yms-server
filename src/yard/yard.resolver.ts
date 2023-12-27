import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { YardService } from './yard.service';

@Resolver('Yard')
export class YardResolver {

    constructor(
        private yardService: YardService ,
    ) {}

    @Query()
    async getYard(@Args('id') id: number) {
        // return this.yardService.findOneById(id)
    }

    @Mutation()
    async addYard(@Args('input') data) {

        return this.yardService.createYard(data)
    }

    async updateYard(@Args('id') id: number, @Args('email') email: string) {
        console.log('calling in resolver.............', id, email);

        return this.yardService.modifyYardEmail(id, email)
    }
    
}
