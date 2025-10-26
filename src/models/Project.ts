import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';
import { IGroup } from './Group';
import { ITask } from './Task';


export interface IProject extends Document {
  name: string;
  description?: string;
  groupId: IGroup['_id'];
  tasks: ITask['_id'][];
  createdBy: IUser['_id'];
  status: 'active' | 'archived' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['active', 'archived', 'completed'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
