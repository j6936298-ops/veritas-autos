import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';
export const dynamic='force-dynamic';
export async function GET(){
 const checks={app:'ok',database:'not_configured',session:Boolean(process.env.SESSION_SECRET&&process.env.SESSION_SECRET.length>=32)};
 let status=200;
 if(process.env.DATABASE_URL){try{const db=getDb();await db.query('SELECT 1');checks.database='connected';}catch{checks.database='unreachable';status=503;}}else{status=503;}
 if(!checks.session)status=503;
 return NextResponse.json({status:status===200?'ready':'configuration_required',checks},{status,headers:{'Cache-Control':'no-store'}});
}
