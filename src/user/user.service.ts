import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInput } from './user.dto';
import { User } from './user.schema';
import { v4 as uuid } from 'uuid';
import { CredentialService } from 'src/credential/credential.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private credentialService: CredentialService,
  ) {}

  async create(input: UserInput): Promise<User> {
    const user = new this.userModel(input);
    user.uuid = uuid();
    await user.save();
    await this.credentialService.save(user._id, input.password);
    return user;
  }

  async findOne(userId: String): Promise<User> {
    return this.userModel.findOne({ _id: userId });
  }
}
