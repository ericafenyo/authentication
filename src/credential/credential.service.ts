import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Credential } from './credential.schema';
import bcrypt = require('bcrypt');

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(Credential.name)
    private model: Model<Credential>,
  ) {}

  async save(userId: string, password: string): Promise<void> {
    const hashedPassword = await this.hash(password);
    await new this.model({ userId, password: hashedPassword }).save();
  }

  async hash(password: string): Promise<string> {
    const saltRounds = 14;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Returns true if the {@link candidate} password matches the hashed one.
   *
   * @param candidate the password to be verified
   * @param hashed the existing password hash
   */
  async isValidCredential(candidate: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(candidate, hashed);
  }
}
