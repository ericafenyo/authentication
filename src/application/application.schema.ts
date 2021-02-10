import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from '../company/company.schema';

@Schema()
export class Application extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  identifier: string;

  @Prop({ default: 86400 })
  tokenExpiration: number;

  @Prop({ default: 'RS256' })
  signingAlgorithm: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: Company })
  companyId: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
