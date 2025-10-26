import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('user-email');
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/', '/login', '/onboarding'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // If user is authenticated and visits a public route, redirect to dashboard
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not authenticated and tries to access a non-public route, redirect to login
  if (!isAuthenticated && !isPublicRoute && pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is not authenticated and is not on a public route (e.g. some other route)
  // redirect them to login. This is a catch-all for non-dashboard protected routes.
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  // Allow access in all other cases
  return NextResponse.next();
}

export const config = {
  // Match all routes except for API routes, Next.js static files, and image files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
