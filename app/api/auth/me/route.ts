import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = (await cookies()).get('qabilah_token')?.value;

  if (!token) return NextResponse.json({ user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // In a real app, you might fetch the full user from DB here
    return NextResponse.json({ user: decoded });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ user: null });
  }
}
