import db from '../adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const repuloterek = express();
repuloterek.use(express.json());



repuloterek.get('/',async (req,res)=>{
    const sql = `SELECT
    repuloterek.kod as repuloterek_kod,
    repuloterek.nev as nev,
    varos,
    orszag,
    COUNT(hova.id) as indulo,
    COUNT(honnan.id) as erkezo
    FROM repuloterek
    JOIN jaratok as hova ON repuloterek.id = hova.hova_id
    JOIN jaratok as honnan ON repuloterek.id = honnan.honnan_id
    GROUP BY nev
    ORDER BY nev desc
    `
    const [eredmeny] = await db.query(sql);
    res.json(eredmeny);
})

export default repuloterek;