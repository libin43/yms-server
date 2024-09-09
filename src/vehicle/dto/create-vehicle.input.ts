import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {

  @Field(() => String, { description: 'Make'})
  make: string;

  @Field(() => String, { description: 'Model'})
  model: string;
  
  @Field(() => String, { description: 'Model'})
  colour: string;

}
