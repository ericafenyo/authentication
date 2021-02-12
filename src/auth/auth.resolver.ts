import { Query as QueryParams, UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Args, ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { LocalAuthGuard } from '../guard/auth.guard';
import { AuthService } from './auth.service';
import { AuthenticatedUser, CurrentUser } from './user.decorator';

@ObjectType()
export class JWTokensType {
  @Field({ name: 'access_token' })
  accessToken: string;

  @Field({ name: 'refresh_token' })
  refreshToken: string;
}

@ArgsType()
export class AuthenticationArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  secret: string;
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  /**
   * Takes the {@link user} information and returns JWT codes
   *
   * @param {AuthenticationArgs} login a GraphQL args with an email and a password
   * @param {AuthenticatedUser} user an {@link AuthenticatedUser} object
   *
   * @returns
   */
  @UseGuards(new LocalAuthGuard('local'))
  @Mutation(() => JWTokensType, { name: 'tokens' })
  async authenticate(@Args() login: AuthenticationArgs, @CurrentUser() user: AuthenticatedUser) {
    return this.authService.getToken(user, login.password);
  }
}
