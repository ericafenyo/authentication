import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      throw new NotFoundException('The user has no account. Create one and try again');
    }
    return company;
  }

  async create(companyInput: CompanyInput): Promise<Company> {
    const user = await this.userService.create(companyInput);
    const company = new this.model({ ...companyInput, user: user._id }).save();
    return company;
  }

  async getUser(userId: string) {
    return await this.userService.findById(userId);
  }
}
