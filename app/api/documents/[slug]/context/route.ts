import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDatabase from "frontend/app/lib/connection";
import Comment from "frontend/app/models/comment";
import Note from "frontend/app/models/note";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params;

    const token = (await cookies()).get("qabilah_token")?.value;

    let userId: string | null = null;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };

      userId = decoded.userId;
    }

    const publicComments = await Comment.find({ slug }).sort({
      createdAt: -1,
    });

    const personalNotes = userId
      ? await Note.find({ slug, userId }).sort({ createdAt: -1 })
      : [];

    return NextResponse.json({ publicComments, personalNotes });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error fetching context" },
      { status: 500 },
    );
  }
}
