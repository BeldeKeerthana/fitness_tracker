'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const isAuthenticated = cookies().has('user-email');
  const { pathname } = request.nextUrl;

  const isAppRoute = pathname.startsWith('/dashboard') || 
                     pathname.startsWith('/workouts') ||
                     pathname.startsWith('/yoga') ||
                     pathname.startsWith('/challenges') ||
                     pathname.startsWith('/goals') ||
                     pathname.startsWith('/log-workout') ||
                     pathname.startsWith('/reports') ||
                     pathname.startsWith('/connect') ||
                     pathname.startsWith('/mental-health');

  if (isAuthenticated) {
    if (pathname === '/' || pathname === '/onboarding') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    if (isAppRoute) {
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('redirect_to', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except for API routes, Next.js static files, and image files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
