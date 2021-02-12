import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CredentialModule } from './credential/credential.module';
import { CompanyModule } from './company/company.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req })
    }),
    AuthModule,
    UserModule,
    CredentialModule,
    CompanyModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
