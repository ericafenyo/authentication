import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { CompanyInput } from './company.resolver';
import { Company } from './company.schema';

@Injectable()
export class CompanyService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(Company.name) private model: Model<Company>,
  ) {}

  async findOne(companyId: string): Promise<Company> {
    const company = await this.model.findOne({ _id: companyId });
    if (!company) {
      throw new NotFoundException('The user has no company. Create one and try again');
    }
    return company;
  }

  async create(props: CompanyInput): Promise<Company> {
    const user = await this.userService.create(props);
    const company = new this.model(props);
    company.ownerId = user._id;
    return company.save();
  }

  async getUser(userId: string): Promise<User> {
    return await this.userService.findById(userId);
  }
}
