// app/api/user/progress/route.ts
import connectToDatabase from "@/app/lib/connection";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    const user = await User.findById(userId).select(
      "streak_count mastered_words last_study_date",
    );

    const responseData = user
      ? {
          streakCount: user.streakCount,
          lastStudyData: user.last_study_date,
          mastered_words: user.mastered_words.map(Number),
          _id: user._id.toString(),
        }
      : {
          streak_count: 0,
          mastered_words: [],
          last_study_date: "",
        };

    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
