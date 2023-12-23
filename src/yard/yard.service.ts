import { Injectable } from '@nestjs/common';

@Injectable()
export class YardService {

    findOneById(id: number) {
        console.log(id);
        
console.log('inside find one by id');

    }
}
