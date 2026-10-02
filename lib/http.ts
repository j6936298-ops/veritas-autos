import { NextResponse } from 'next/server';

export function apiError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unexpected server error';
  const isUnauthenticated = message === 'UNAUTHENTICATED';
  const isForbidden = message === 'FORBIDDEN';
  const status = isUnauthenticated ? 401 : isForbidden ? 403 : 400;
  const safeMessage = isUnauthenticated || isForbidden ? message : 'Unexpected server error';

  return NextResponse.json({ error: safeMessage }, { status });
}

export function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
