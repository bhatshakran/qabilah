import mongoose, { InferSchemaType } from "mongoose";

const ExampleSchema = new mongoose.Schema({
  ar: { type: String, required: true },
  en: { type: String, required: true },
});

const VocabularySchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
      required: true,
      unique: true,
    },
    arabic: {
      type: String,
      required: true,
      index: true,
    },
    english: {
      type: String,
      required: true,
    },
    transliteration: {
      type: String,
    },
    type: {
      type: String,
      enum: ["ism", "fi'l", "harf", "phrase"],
      required: true,
    },
    level: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    root: {
      type: String,
      default: null,
      index: true,
    },
    examples: [ExampleSchema],
  },

  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "vocabulary",
  },
);

// Text index for powerful searching across Arabic and English definitions
VocabularySchema.index({ arabic: "text", english: "text", root: "text" });

export type VocabularyType = InferSchemaType<typeof VocabularySchema>;

export default mongoose.models.Vocabulary ||
  mongoose.model("Vocabulary", VocabularySchema);
