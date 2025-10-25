
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = cookies().has('user-email');
  const { pathname } = request.nextUrl;

  const isPublicPage = pathname.startsWith('/login') || pathname.startsWith('/onboarding') || pathname === '/';

  if (!isAuthenticated && !isPublicPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isPublicPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Do not run middleware on these paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// We need to import and use cookies to make this a dynamic function
// https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions
import { cookies } from 'next/headers';
