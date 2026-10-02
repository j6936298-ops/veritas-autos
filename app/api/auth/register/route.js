import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getDb } from '../../../../lib/db';
import { createSession } from '../../../../lib/session';
import { jsonError,jsonOk,readJson } from '../../../../lib/http';
const schema=z.object({name:z.string().trim().min(2).max(120),email:z.email().max(190).transform(v=>v.toLowerCase()),phone:z.string().max(40).optional().default(''),password:z.string().min(10).max(128),role:z.enum(['CUSTOMER','VENDOR']).default('CUSTOMER'),businessName:z.string().trim().max(180).optional().default(''),vendorType:z.enum(['RETAILER','WHOLESALER']).default('RETAILER')});
export async function POST(request){
 const raw=await readJson(request);const parsed=schema.safeParse(raw);if(!parsed.success)return jsonError(parsed.error.issues[0]?.message||'Check the information entered.');
 const v=parsed.data; if(v.role==='VENDOR'&&v.businessName.length<2)return jsonError('Enter your business name.');
 try{const db=getDb();const [exists]=await db.execute('SELECT id FROM users WHERE email=? LIMIT 1',[v.email]);if(exists.length)return jsonError('An account with this email already exists.',409);
 const id=randomUUID(), hash=await bcrypt.hash(v.password,12);const conn=await db.getConnection();
 try{await conn.beginTransaction();await conn.execute('INSERT INTO users (id,name,email,phone,password_hash,role) VALUES (?,?,?,?,?,?)',[id,v.name,v.email,v.phone||null,hash,v.role]);if(v.role==='VENDOR'){const vendorId=randomUUID();await conn.execute('INSERT INTO vendors (id,user_id,business_name,vendor_type,approved) VALUES (?,?,?,?,0)',[vendorId,id,v.businessName,v.vendorType]);await conn.execute('INSERT INTO wallets (id,vendor_id) VALUES (?,?)',[randomUUID(),vendorId]);}await conn.commit();}catch(e){await conn.rollback();throw e;}finally{conn.release();}
 await createSession({id,role:v.role,email:v.email,name:v.name});return jsonOk({ok:true,redirect:'/dashboard'},201);
 }catch(e){if(e?.code==='ER_DUP_ENTRY')return jsonError('An account with this email already exists.',409);console.error('Registration error:',e);return jsonError('Account creation is temporarily unavailable. Please try again later.',500);}
}
