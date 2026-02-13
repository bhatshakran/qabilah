import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    surface: { type: String, required: true },
    index: { type: Number, required: true },
  },
  { _id: false },
); // No need for separate IDs for every single token

const SentenceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    sentenceIndex: { type: Number, required: true },
    ar: { type: String, required: true },
    en: { type: String, required: true },
    tokens: [TokenSchema],
  },
  { _id: false },
);

const ParagraphSchema = new mongoose.Schema(
  {
    paragraphIndex: { type: Number, required: true },
    sentences: [SentenceSchema],
  },
  { _id: false },
);
const PageSchema = new mongoose.Schema(
  {
    pageIndex: { type: Number, required: true },
    title_en: { type: String },
    title_ar: { type: String },
    paragraphs: [ParagraphSchema],
  },
  { _id: false },
);

const DocumentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // Your custom art_history_001
    title: { type: String, required: true },
    subtitle: { type: String },
    slug: { type: String, required: true, unique: true, index: true },
    date: { type: String }, // Storing as string to match your JSON "2026-02-07"
    source: { type: String },
    author: { type: String },
    structure: [PageSchema],
  },
  { timestamps: true },
);
export default mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
