import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IProject } from './Project';

export interface IGroup extends Document {
  name: string;
  description?: string;
  members: IUser['_id'][];
  projects: IProject['_id'][];
  createdBy: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema: Schema<IGroup> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Group: Model<IGroup> =
  mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);

export default Group;
