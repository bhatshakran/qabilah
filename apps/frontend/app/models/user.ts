import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  level: { type: String, default: "Beginner" },
  createdAt: { type: Date, default: Date.now },
  streak_count: { type: Number, default: 0 },
  mastered_words: [{ type: String }],
  last_study_date: { type: String, default: "" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
