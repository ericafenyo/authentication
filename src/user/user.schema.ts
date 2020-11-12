import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  avatar_path: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  uuid: {
    type: String,
    unique: true,
  },
  user_metadata: {
    type: Object,
    default: {},
  },
  last_password_reset: {
    type: Date,
  },
  logins_count: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export class User extends Document {
  name: string;
  email: string;
  username: string;
  avatar_path: string;
  uuid: string;
  email_verified: boolean;
  bio: string;
  last_password_reset: Date;
  logins_count: number;
  user_metadata: any;
  created_at: Date;
  updated_at: Date;
}
