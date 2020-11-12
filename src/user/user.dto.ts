import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  // Fields required to create a basic account
  @Field()
  email: string;

  @Field()
  password: string;

  // Addition optional fields
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  bio?: string;
}
