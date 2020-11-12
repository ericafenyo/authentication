import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  bio: string;

  @Field()
  email: string;

  @Field()
  email_verified: boolean;

  @Field()
  avatar_path: string;

  //   @Field(type => ObjectType)
  //   user_metadata: any;
}
