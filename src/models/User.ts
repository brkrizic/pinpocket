import mongoose, { Schema, Document, Model } from 'mongoose';
import { IGroup } from './Group';
import { IProject } from './Project';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  groups: IGroup['_id'][];
  projects: IProject['_id'][];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },

    // Relations
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  },
  { timestamps: true }
);

// Prevent model overwrite errors in dev with hot reload
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
