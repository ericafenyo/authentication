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
  @Field()
  username?: string;

  @Field()
  firstName?: string;

  @Field()
  middleName?: string;

  @Field()
  lastName?: string;

  @Field()
  email?: string;

  @Field()
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

  @Mutation(() => User, { name: 'user' })
  async createUser(@Args('user') user: UserInput) {
    return await this.userService.create(user);
  }

  @ResolveField()
  async name(@Parent() user: User) {
    return `${user.firstName} ${user.lastName}`;
  }
}
