import { Resolver, Query, Args } from '@nestjs/graphql';
import { YardService } from './yard.service';

@Resolver('Yard')
export class YardResolver {

    constructor(
        private yardService: YardService ,
    ) {}

    @Query()
    async getYard(@Args('id') id: number) {
        return this.yardService.findOneById(id)
    }
    
}
