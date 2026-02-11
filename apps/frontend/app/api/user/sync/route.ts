// app/api/user/sync/route.ts
import connectToDatabase from "@/app/lib/connection";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { userId, wordId } = await req.json(); // wordId is the 'rank' number

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const today = new Date().toISOString().split("T")[0]; // "2026-02-11"
    const lastDate = user.last_study_date;

    let newStreak = user.streak_count;

    // --- Streak Logic ---
    if (!lastDate) {
      newStreak = 1; // First time ever
    } else if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastDate === yesterdayStr) {
        newStreak += 1; // Success! Yesterday was the last study day
      } else {
        newStreak = 1; // Missed a day, reset streak
      }
    }

    // --- Atomic Update ---
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          streak_count: newStreak,
          last_study_date: today,
        },
        $addToSet: { mastered_words: wordId }, // Adds wordId ONLY if not already present
      },
      { new: true }, // Return the document AFTER the update
    ).select("streak_count mastered_words last_study_date");

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
