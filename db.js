import mysql from 'mysql2/promise';

const conn = {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'repulojaratok',
    port : 3307
}

const db = await mysql.createPool(conn);
export default db;
