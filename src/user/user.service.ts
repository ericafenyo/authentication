import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CredentialService } from 'src/credential/credential.service';
import { UserInput } from './user.resolver';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private model: Model<User>,
    private credentialService: CredentialService,
  ) {}

  async create(userInput: UserInput): Promise<User> {
    if (!userInput.email && userInput.username) {
      throw new BadRequestException('email or username must be provided');
    }

    const user = await new this.model(userInput).save();
    await this.credentialService.save(user._id, userInput.password);
    return user;
  }

  async findById(userId: string): Promise<User> {
    return await this.model.findOne({ _id: userId });
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.model.findOne({ email });

    if (!user) {
      throw new NotFoundException('User account not found');
    }

    const password = await this.credentialService.findPasswordByUserId(user._id);

    return {
      id: user._id,
      email: user.email,
      verified: user.verified,
      avatar: user.avatar,
      password: password,
    };
  }
}
