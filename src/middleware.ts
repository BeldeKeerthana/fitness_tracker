
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = cookies().has('user-email');
  const { pathname } = request.nextUrl;

  // Define public paths that are always accessible
  const isPublicPath = pathname.startsWith('/login') || pathname.startsWith('/onboarding');
  const isHomePage = pathname === '/';

  // If user is authenticated
  if (isAuthenticated) {
    // If they are on a public path (like login/onboarding), redirect to dashboard
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // If they are on the home page, redirect to dashboard
    if (isHomePage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  // If user is not authenticated
  else {
    // And they are trying to access a protected route (not public, not home)
    if (!isPublicPath && !isHomePage) {
      // Redirect them to login, preserving the intended destination
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect_to', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Do not run middleware on these paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// We need to import and use cookies to make this a dynamic function
// https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions
import { cookies } from 'next/headers';
