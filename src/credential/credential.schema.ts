import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema()
export class Credential extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, unique: true })
  user_id: User;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);