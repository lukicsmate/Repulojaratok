import mysql from 'mysql2/promise';

const conn = {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'jaratok',
    port : 3307
}

const db = await mysql.createPool(conn);
export default db;
