import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema()
export class Company extends Document {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: User, required: true })
  userId: string;

  @Prop({ type: [Types.ObjectId] })
  tenants: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
