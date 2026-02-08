// src/models/Note.ts
import mongoose, { InferSchemaType } from 'mongoose';

const NoteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Fast lookup for "My Notes"
  },
  slug: {
    type: String,
    required: true,
    index: true,
  },
  sentenceIndex: {
    type: Number,
    default: null, // null = note on the whole article, number = specific paragraph
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  tags: [String], // e.g., ["grammar", "vocabulary"]
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Composite index: Ensure fast lookup for a specific user on a specific article
NoteSchema.index({ userId: 1, slug: 1 });
export type Note = InferSchemaType<typeof NoteSchema>;
export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
