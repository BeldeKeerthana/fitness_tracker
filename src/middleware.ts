import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const isAuthenticated = cookies().has('user-email');
  const { pathname } = request.nextUrl;

  const isPublicRoute = ['/', '/onboarding'].includes(pathname);
  
  if (isAuthenticated) {
    // If user is logged in and tries to access a public route, redirect to dashboard
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    // If user is not logged in and tries to access a protected route, redirect to login
    if (!isPublicRoute) {
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
