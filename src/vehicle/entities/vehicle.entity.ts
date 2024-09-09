import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => String, { description: 'Id'})
  id: string;

  @Field(() => String, { description: 'Make'})
  make: string;

  @Field(() => String, { description: 'Model'})
  model: string;
  
  @Field(() => String, { description: 'Model'})
  colour: string;
}
