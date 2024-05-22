import { createPool } from 'mysql2/promise';
import {DB_HOST, DB_USER, DB_PASS, DB_DB, DB_PORT} from './config.js';

console.log(`DB_HOST: ${DB_HOST}`);
console.log(`DB_USER: ${DB_USER}`);
console.log(`DB_PASS: ${DB_PASS}`);
console.log(`DB_DB: ${DB_DB}`);
console.log(`DB_PORT: ${DB_PORT}`);

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DB,
    port: DB_PORT
});