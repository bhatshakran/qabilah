// src/models/Comment.ts
import mongoose, { InferSchemaType } from 'mongoose';

const CommentSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    index: true, // Fast lookup for "Load Comments for this Article"
  },
  sentenceIndex: {
    type: Number,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Cache user details to avoid extra DB calls
  authorName: { type: String, required: true },
  authorAvatar: { type: String }, // Optional: URL to avatar

  content: {
    type: String,
    required: true,
  },
  likes: { type: Number, default: 0 },
  isSpoiler: { type: Boolean, default: false }, // Good for quizzes/translations
  createdAt: { type: Date, default: Date.now },
});
export type Comment = InferSchemaType<typeof CommentSchema>;
export default mongoose.models.Comment ||
  mongoose.model('Comment', CommentSchema);
