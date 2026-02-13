// src/models/Dictionary.ts
import mongoose, { InferSchemaType } from "mongoose";

const DictionarySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true, // Crucial: no duplicates
    index: true,
  },
  translation: { type: String, required: true },
  transliteration: { type: String },
  explanation: { type: String },
  usageCount: { type: Number, default: 1 }, // Track popularity
  lastUsed: { type: Date, default: Date.now },
});
export type Dictionary = InferSchemaType<typeof DictionarySchema> & {
  _id: string;
};
export default mongoose.models.Dictionary ||
  mongoose.model("Dictionary", DictionarySchema);
