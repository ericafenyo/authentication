import {
  Resolver,
  InputType,
  Field,
  Mutation,
  Query,
  Args,
  ObjectType,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserType } from 'src/user/user.resolver';
import { User } from 'src/user/user.schema';
import { Company } from './company.schema';
import { CompanyService } from './company.service';

@InputType()
export class CompanyInput {
  @Field()
  name: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class CompanyType {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  name: string;

  @Field()
  user: UserType;
}

@Resolver(() => CompanyType)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => CompanyType, { name: 'company' })
  async getCompany(@Args('companyId') companyId: string): Promise<Company> {
    return await this.companyService.findOne(companyId);
  }

  @Mutation(() => CompanyType, { name: 'company' })
  async createCompany(@Args('input') input: CompanyInput): Promise<Company> {
    return await this.companyService.create(input);
  }

  @ResolveField()
  async user(@Parent() company: Company): Promise<User> {
    return await this.companyService.getUser(company.userId);
  }
}
