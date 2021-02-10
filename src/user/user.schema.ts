import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  userMetadata: any;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: false })
  blocked: boolean;

  @Prop()
  lastPasswordReset?: Date;

  @Prop()
  lastLogin?: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
