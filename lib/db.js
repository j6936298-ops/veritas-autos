import mysql from 'mysql2/promise';

let pool;
function parseDatabaseUrl(value) {
  const url = new URL(value);
  if (!['mysql:', 'mariadb:'].includes(url.protocol)) throw new Error('DATABASE_URL must use mysql:// or mariadb://');
  const database = decodeURIComponent(url.pathname.replace(/^\//, ''));
  if (!database) throw new Error('DATABASE_URL must include a database name.');
  const useSsl = process.env.NODE_ENV === 'production' || url.searchParams.get('ssl') === 'true';
  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database,
    ssl: useSsl ? { rejectUnauthorized: true } : undefined,
  };
}
export function getDb() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured. Add it in Vercel Project Settings.');
  if (!pool) {
    pool = mysql.createPool({
      ...parseDatabaseUrl(process.env.DATABASE_URL),
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 2,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      decimalNumbers: true,
      dateStrings: true,
    });
  }
  return pool;
}
