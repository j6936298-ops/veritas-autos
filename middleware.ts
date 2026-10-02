import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname;
 const protectedPath = ['/dashboard','/vendor','/admin','/tickets','/chat'].some(p => path === p || path.startsWith(p+'/'));
 if (protectedPath && !request.cookies.get('veritas_session')) {
  const url = new URL('/login', request.url); url.searchParams.set('next', path); return NextResponse.redirect(url);
 }
 return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*','/vendor/:path*','/admin/:path*','/tickets/:path*','/chat/:path*'] };
