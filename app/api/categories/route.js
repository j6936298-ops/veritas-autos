import {getDb} from '../../../lib/db';import {jsonError,jsonOk} from '../../../lib/http';
export async function GET(){try{const db=getDb();const [rows]=await db.execute('SELECT id,name,slug,description FROM categories WHERE active=1 ORDER BY name');return jsonOk({categories:rows});}catch(e){console.error('Categories error:',e);return jsonError('Could not load categories.',500);}}
