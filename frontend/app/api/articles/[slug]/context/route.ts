import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../../lib/connection';
import Comment from '../../../../models/comment';
import Note from '../../../../models/note';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectToDatabase();
    const awaitedParams = await params;
    const slug = awaitedParams.slug;
    // 1. Get User ID from Token (if logged in)
    const token = (await cookies()).get('qabilah_token')?.value;
    let userId = null;
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      userId = decoded.userId;
    }

    // 2. Fetch Public Comments
    const publicComments = await Comment.find({ slug }).sort({
      createdAt: -1,
    });

    // 3. Fetch Private Notes (Only if user is logged in)
    const personalNotes = userId
      ? await Note.find({ slug, userId }).sort({ createdAt: -1 })
      : [];

    return NextResponse.json({ publicComments, personalNotes });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error fetching context' },
      { status: 500 }
    );
  }
}
