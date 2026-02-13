import connectToDatabase from "@/app/lib/connection";
import Document from "@/app/models/document";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch only metadata to keep the response light
    const documents = await Document.find(
      {},
      {
        title: 1,
        subtitle: 1,
        slug: 1,
        difficulty: 1,
        date: 1,
        category: 1,
        level: 1,
        // We don't fetch "paragraphs" here
      },
    ).sort({ date: -1 });

    return NextResponse.json(documents);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to load library" },
      { status: 500 },
    );
  }
}
