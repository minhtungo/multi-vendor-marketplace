import { getAuthToken } from '@/lib/cookies';
import { getOrCreateSessionId } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

const authPages = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'];

export async function middleware(request: NextRequest) {
  console.log('middleware');
  const { pathname } = request.nextUrl;

  const isAuthPage = authPages.includes(pathname);
  const isAccountPage = pathname.startsWith('/account');

  const token = await getAuthToken();
  const isAuthenticated = !!token;

  await getOrCreateSessionId();

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  if (isAccountPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/account/:path*'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
