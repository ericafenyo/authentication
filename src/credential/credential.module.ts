import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Credential, CredentialSchema } from './credential.schema';
import { CredentialService } from './credential.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Credential.name, schema: CredentialSchema },
    ]),
  ],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule {}
