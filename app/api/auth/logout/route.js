import { NextResponse } from 'next/server';import { destroySession } from '../../../../lib/session';
export async function POST(request){await destroySession();if((request.headers.get('content-type')||'').includes('application/x-www-form-urlencoded'))return NextResponse.redirect(new URL('/login',request.url),303);return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});}
