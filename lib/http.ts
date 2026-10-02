import { NextResponse } from 'next/server';
export function apiError(error: unknown) {
 const message = error instanceof Error ? error.message : 'Unexpected server error';
 const status = message === 'UNAUTHENTICATED' ? 401 : message === 'FORBIDDEN' ? 403 : 400;
 return NextResponse.json({ error: status === 500 ? 'Unexpected server error' : message }, { status });
}
export function slugify(value: string) { return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
