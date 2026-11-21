import mysql from 'mysql2/promise.js';
import { readFileSync } from 'node:fs';

const connection = await mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    port: Number(process.env.portDB),
    password: process.env.password,
    database: process.env.database,
    ssl: {
        ca: readFileSync(new URL('./ca.pem', import.meta.url)),
        rejectUnauthorized: true
    }
});

console.log("sql")

export default connection;