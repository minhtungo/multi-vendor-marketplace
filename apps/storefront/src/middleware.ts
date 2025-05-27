import { getAuthToken } from '@/lib/cookies';
import { NextRequest, NextResponse } from 'next/server';

const publicPages = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPage = publicPages.includes(pathname);
  const isAccountPage = pathname.startsWith('/account');

  const token = await getAuthToken();
  const isAuthenticated = !!token;

  if (isPublicPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  if (isAccountPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/account/:path*'],
};
