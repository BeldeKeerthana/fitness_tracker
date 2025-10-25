
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const isAuthenticated = cookies().has('user-email');
  const { pathname } = request.nextUrl;

  const isAppRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/workouts') || pathname.startsWith('/yoga') || pathname.startsWith('/challenges') || pathname.startsWith('/goals') || pathname.startsWith('/log-workout') || pathname.startsWith('/reports') || pathname.startsWith('/connect') || pathname.startsWith('/mental-health');

  // If user is authenticated
  if (isAuthenticated) {
    // If they are on a public path (like login/onboarding) or home, redirect to dashboard
    if (pathname.startsWith('/login') || pathname.startsWith('/onboarding') || pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  // If user is not authenticated
  else {
    // And they are trying to access a protected app route
    if (isAppRoute) {
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
