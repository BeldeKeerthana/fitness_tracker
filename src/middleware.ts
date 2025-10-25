'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const isAuthenticated = cookies().has('user-email');
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/', '/login', '/onboarding'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // If user is authenticated
  if (isAuthenticated) {
    // If they visit a public route, redirect to dashboard
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Otherwise, allow them to access the app route
    return NextResponse.next();
  }

  // If user is not authenticated
  // and they are trying to access a non-public route
  if (!isPublicRoute) {
    // Redirect them to the login page
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to public routes for unauthenticated users
  return NextResponse.next();
}

export const config = {
  // Match all routes except for API routes, Next.js static files, and image files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
