import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('qabilah_token');

  // If trying to access /library without a token, boot them to home
  if (!token && request.nextUrl.pathname.startsWith('/library')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
