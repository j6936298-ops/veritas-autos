import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';
import type { Role } from '@prisma/client';
const cookieName = 'veritas_session';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'development-only-change-this-secret-before-deploying-123456');
export type SessionUser = { id: string; name: string; email: string; role: Role };
export async function createSession(user: SessionUser) {
 const token = await new SignJWT(user).setProtectedHeader({ alg:'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret);
 (await cookies()).set(cookieName, token, { httpOnly:true, secure:process.env.NODE_ENV === 'production', sameSite:'lax', path:'/', maxAge:60*60*24*7 });
}
export async function clearSession() { (await cookies()).delete(cookieName); }
export async function getSession(): Promise<SessionUser | null> {
 const token = (await cookies()).get(cookieName)?.value;
 if (!token) return null;
 try { const { payload } = await jwtVerify(token, secret); return { id:String(payload.id), name:String(payload.name), email:String(payload.email), role:payload.role as Role }; } catch { return null; }
}
export async function requireUser() { const session = await getSession(); if (!session) throw new Error('UNAUTHENTICATED'); return session; }
export async function requireRole(...roles: Role[]) { const user = await requireUser(); if (!roles.includes(user.role)) throw new Error('FORBIDDEN'); return user; }
export async function currentVendor(userId: string) { return db.vendor.findUnique({ where:{ userId } }); }
