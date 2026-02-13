import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/app/lib/connection";
import Comment from "@/app/models/comment";
import Note from "@/app/models/note";

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const token = (await cookies()).get("qabilah_token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const { type, sentenceIndex, content, authorName } = await request.json();

    await connectToDatabase();
    const { slug } = await context.params;
    console.log(
      {
        slug,
        sentenceIndex,
        userId: decoded.userId,
        authorName: authorName || "Anonymous Warrior",
        content,
      },
      "detaildss",
    );
    if (type === "comment") {
      const newComment = await Comment.create({
        slug,
        sentenceIndex,
        userId: decoded.userId,
        authorName: authorName || "Anonymous Warrior",
        content,
      });
      return NextResponse.json(newComment);
    }

    if (type === "note") {
      const newNote = await Note.create({
        slug,
        sentenceIndex,
        userId: decoded.userId,
        content,
      });
      return NextResponse.json(newNote);
    }

    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error saving interaction" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const token = (await cookies()).get("qabilah_token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const { id, content } = await request.json();

    await connectToDatabase();

    // Ensure the note belongs to the user
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: decoded.userId },
      { content, updatedAt: new Date() },
      { new: true },
    );

    if (!updatedNote)
      return NextResponse.json({ message: "Note not found" }, { status: 404 });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const token = (await cookies()).get("qabilah_token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const { noteId } = await request.json(); // Pass the ID in the body

    await connectToDatabase();

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      userId: decoded.userId,
    });

    if (!deletedNote)
      return NextResponse.json({ message: "Note not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
