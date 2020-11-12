import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './user.dto';
import { User } from './user.model';
import { UserService } from './user.service';
//import { User } from './user.model';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return await this.userService.create(input);
  }
}
