import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGroup extends Document {
    name: string;
    usersId: any[];
    createdAt: Date;
}

const GroupSchema: Schema<IGroup> = new Schema(
    {
        name: { type: String, required: true },
        usersId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now },
    }
);

// This prevents model overwrite errors in development due to hot reloading
const Group: Model<IGroup> =
  mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);

export default Group;