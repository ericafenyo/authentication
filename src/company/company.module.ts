import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { Application, ApplicationSchema } from './application.schema';
import { CompanyResolver } from './company.resolver';
import { Company, CompanySchema } from './company.schema';
import { CompanyService } from './company.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Application.name, schema: ApplicationSchema },
    ]),
    UserModule,
  ],
  providers: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
