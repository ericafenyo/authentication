import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CredentialService } from 'src/credential/credential.service';
import { UserInput } from './user.resolver';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private credentialService: CredentialService,
  ) {}

  async create(userInput: UserInput): Promise<User> {
    if (!userInput.email && userInput.username) {
      throw new BadRequestException('email or username must be provided');
    }

    const user = await new this.userModel(userInput).save();
    await this.credentialService.save(user._id, userInput.password);
    return user;
  }

  async findById(userId: string): Promise<User> {
    return await this.userModel.findOne({ _id: userId });
  }
}
