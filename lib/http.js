import { NextResponse } from 'next/server';
export function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } });
}
export function jsonOk(data, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}
export async function readJson(request) {
  try { return await request.json(); } catch { return null; }
}
export function isValidEmail(email) { return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
export function text(value, max = 300) { return typeof value === 'string' ? value.trim().slice(0, max) : ''; }
