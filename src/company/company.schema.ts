import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Company extends Document {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: User, required: true })
  ownerId: string;

  @Prop({ default: [] })
  tenants: [
    {
      id: Types.ObjectId;
    },
  ];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
