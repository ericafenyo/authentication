import { Field, InputType, ObjectType, Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Max } from 'class-validator';
import { CompanyType } from '../company/company.resolver';
import { Application } from './application.schema';
import { ApplicationService } from './application.service';

@InputType()
export class ApplicationInput {
  @Field()
  companyId: string;

  @Field({ description: 'The application name. 50 characters max' })
  @Max(50)
  name: string;

  @Field({ description: 'A short description of the app. 100 characters max' })
  @Max(50)
  description: string;
}

@ObjectType()
export class ApplicationType {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  identifier: string;

  @Field()
  tokenExpiration: number;

  @Field()
  signingAlgorithm: string;

  @Field()
  createdAt: Date;

  @Field()
  company: CompanyType;
}

@Resolver(() => ApplicationType)
export class ApplicationResolver {
  constructor(private appService: ApplicationService) {}

  @Query(() => [ApplicationType], { name: 'applications' })
  async getApplications(@Args('companyId') companyId: string): Promise<Application[]> {
    return await this.appService.findAll(companyId);
  }

  @Query(() => ApplicationType, { name: 'application' })
  async getApplication(
    @Args('companyId') companyId: string,
    @Args('applicationId') applicationId: string,
  ): Promise<Application> {
    return await this.appService.findByIds(companyId, applicationId);
  }

  @Mutation(() => ApplicationType, { name: 'application' })
  async createApplication(@Args('props') props: ApplicationInput): Promise<Application> {
    return await this.appService.create(props);
  }
}
