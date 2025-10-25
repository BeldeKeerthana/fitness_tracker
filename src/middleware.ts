
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const isAuthenticated = cookies().has('user-email');
  const { pathname } = request.nextUrl;

  const isPublicRoute = ['/login', '/onboarding'].includes(pathname);
  
  // If the user is authenticated
  if (isAuthenticated) {
    // If they try to access a public route or the root, redirect to dashboard
    if (isPublicRoute || pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  // If the user is not authenticated
  else {
    // If they are trying to access a route that is not public and not the root page,
    // redirect them to the login page.
    const isAppRoute = !isPublicRoute && pathname !== '/';
    if (isAppRoute) {
      const loginUrl = new URL('/login', request.url);
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
