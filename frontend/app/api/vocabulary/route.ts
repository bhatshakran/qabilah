import connectToDatabase from "@/app/lib/connection";
import Vocabulary from "@/app/models/vocabulary";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    // const { searchParams } = new URL(request.url);
    // console.log("jere");
    // // Get query params for filtering and pagination
    // const search = searchParams.get("search");
    // const type = searchParams.get("type");
    // const limit = parseInt(searchParams.get("limit") || "100");
    // const page = parseInt(searchParams.get("page") || "1");

    // 1. Fix the type error

    // 2. Removed .toArray() (Mongoose find() handles this)
    const data = await Vocabulary.find(
      {},
      {
        rank: 1,
        translation: 1,
        transliteration: 1,
        arabic: 1,
        english: 1,
        type: 1,
        level: 1,
        examples: 1,
        root: 1,
        // We don't fetch "paragraphs" here
      },
    )
      .sort({ rank: 1 })
      .limit(100);
    const total = await Vocabulary.countDocuments();

    return NextResponse.json({
      data,
      pagination: {
        total,
        // page,
        // limit,
        // totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch vocabulary" },
      { status: 500 },
    );
  }
}
