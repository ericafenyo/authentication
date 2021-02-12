import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ default: '' })
  middleName: string;

  @Prop({ default: '' })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  avatar: string;

  metadata: any;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: false })
  blocked: boolean;

  @Prop()
  lastPasswordReset?: Date;

  @Prop()
  lastLogin?: Date;

  @Prop({ default: [] })
  companyIds: [
    {
      id: Types.ObjectId;
    },
  ];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
