import {
  Args,
  InputType,
  Mutation,
  Query,
  Resolver,
  Field,
  ObjectType,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserType {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  bio: string;

  @Field()
  avatar: string;

  @Field()
  verified: boolean;

  @Field()
  blocked: boolean;

  metadata: any;

  @Field()
  createdAt: Date;
}

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType, { name: 'user' })
  async getUser(@Args('userId') userId: string): Promise<User> {
    return await this.userService.findById(userId);
  }

  @Mutation(() => UserType, { name: 'user' })
  async createUser(@Args('user') user: UserInput): Promise<User> {
    return await this.userService.create(user);
  }

  @ResolveField()
  async name(@Parent() user: User): Promise<string> {
    return `${user.firstName} ${user.lastName}`;
  }
}
