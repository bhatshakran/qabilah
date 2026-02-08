import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Overwrite the cookie with an expired date to delete it
  response.cookies.set('qabilah_token', '', {
    expires: new Date(0),
    path: '/',
  });
  return response;
}
