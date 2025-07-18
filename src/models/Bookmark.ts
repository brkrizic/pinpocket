import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBookmark extends Document {
  title: string;
  url: string;
  description: string;
  tags: [string];
  createdAt: Date;
  categoryId: any;
  userId: any;
}

const BookmarkSchema: Schema<IBookmark> = new Schema(
    {
        title: { type: String, required: true },
        url: { type: String, required: true },
        description: String,
        tags: [String],
        createdAt: { type: Date, default: Date.now },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
);

// This prevents model overwrite errors in development due to hot reloading
const Bookmark: Model<IBookmark> =
  mongoose.models.Bookmark || mongoose.model<IBookmark>('Bookmark', BookmarkSchema);

export default Bookmark;