import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  // url.searchParams.set('viewport', viewport);
  if (viewport === 'mobile') {
    return NextResponse.rewrite(new URL(`/mobile${url.pathname}`, url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/contacts',
    '/about',
    '/cart',
    '/checkout',
    '/comparison',
    '/favorite',
    '/how',
    '/privacy',
  ],
};
