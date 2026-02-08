import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../../lib/connection';
import Comment from '../../../../models/comment';
import Note from '../../../../models/note';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const token = (await cookies()).get('qabilah_token')?.value;
    if (!token)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const { type, sentenceIndex, content, authorName } = await request.json();

    await connectToDatabase();
    const awaitedParams = await params;
    const slug = awaitedParams.slug;

    console.log(
      {
        slug,
        sentenceIndex,
        userId: decoded.userId,
        authorName: authorName || 'Anonymous Warrior',
        content,
      },
      'detaildss'
    );
    if (type === 'comment') {
      const newComment = await Comment.create({
        slug,
        sentenceIndex,
        userId: decoded.userId,
        authorName: authorName || 'Anonymous Warrior',
        content,
      });
      return NextResponse.json(newComment);
    }

    if (type === 'note') {
      const newNote = await Note.create({
        slug,
        sentenceIndex,
        userId: decoded.userId,
        content,
      });
      return NextResponse.json(newNote);
    }

    return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error saving interaction' },
      { status: 500 }
    );
  }
}
