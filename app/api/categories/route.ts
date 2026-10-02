import {NextResponse} from 'next/server';import {db} from '@/lib/db';export async function GET(){return NextResponse.json({categories:await db.category.findMany({orderBy:{name:'asc'}})});}
