'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const isAuthenticated = cookies().has('user-email');
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === '/login' || pathname === '/onboarding';
  
  // The root home page is public
  if (pathname === '/') {
    // If logged in, redirect from home to dashboard
    if (isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // If logged in, redirect from public routes to dashboard
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If not logged in and trying to access a protected app route, redirect to login
  if (!isAuthenticated && !isPublicRoute && pathname.startsWith('/')) {
    const loginUrl = new URL('/login', request.url);
    if (pathname !== '/') {
        loginUrl.searchParams.set('redirect_to', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except for API routes, Next.js static files, and image files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
