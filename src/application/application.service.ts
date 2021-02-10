import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/company/company.schema';
import { ApplicationInput } from './application.resolver';
import { Application } from './application.schema';
import { generateKey } from '../util';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name) private model: Model<Application>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async findAll(companyId: string): Promise<Application[]> {
    return await this.model.find({ companyId });
  }

  async findByIds(companyId: string, applicationId: string): Promise<Application> {
    const application = await this.model.findOne({ _id: applicationId, companyId });
    if (!application) {
      throw new NotFoundException('The user has no company. Create one and try again');
    }
    return application;
  }

  async create(props: ApplicationInput): Promise<Application> {
    const company = await this.companyModel.findOne({ _id: props.companyId });
    if (!company) {
      throw new NotFoundException('The user has no company. Create one and try again');
    }

    const application = new this.model(props);
    application.identifier = generateKey();
    application.companyId = company._id;
    return await application.save();
  }
}
