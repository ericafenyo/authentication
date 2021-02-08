import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class User extends Document {
  @Prop({ default: '' })
  @Field()
  firstName: string;

  @Prop({ default: '' })
  @Field()
  lastName: string;

  @Prop({ default: '' })
  @Field()
  middleName: string;

  @Prop({ default: '', unique: true })
  @Field()
  username: string;

  @Prop({ default: '', unique: true })
  @Field()
  email: string;

  @Prop({ default: '' })
  @Field()
  bio: string;

  @Prop({ default: '' })
  @Field()
  avatar: string;

  userMetadata: any;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: false })
  blocked: boolean;

  @Prop({ default: '' })
  @Field({ nullable: true })
  lastPasswordReset: Date;

  @Prop({ default: '' })
  @Field({ nullable: true })
  lastLogin: Date;

  @Prop({ default: Date.now })
  @Field()
  createdAt: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
