import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => String, { description: 'First name'})
  fname: string;

  @Field(() => String, { description: 'Last name'})
  lname: string;
  
  @Field(() => String, { description: 'Contact'})
  contact: string;

  @Field(() => UserRole, { description: 'Role'})
  role: UserRole;
}
