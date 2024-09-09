import { InputType, Int, Field } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { registerEnumType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'First name'})
  fname: string;

  @Field(() => String, { description: 'Last name'})
  lname: string;
  
  @Field(() => String, { description: 'Contact'})
  contact: string;

  @Field(() => UserRole, { description: 'Role'})
  role: UserRole;

}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The roles of the user'
});