
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = [
    '/dashboard',
    '/workouts',
    '/yoga',
    '/challenges',
    '/goals',
    '/log-workout',
    '/reports',
    '/connect',
    '/mental-health'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const name = request.cookies.get('user-name');

  // If user is not logged in (no name cookie) and is trying to access a protected route, redirect to login
  if (!name && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
