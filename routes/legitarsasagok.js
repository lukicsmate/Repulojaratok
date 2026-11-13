import db from '../adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const legitarsasagok = express();
legitarsasagok.use(express.json());

legitarsasagok.get('/',async (req,res)=>{
    const sql = `SELECT 
    repuloterek.kod,
    legitarsasagok.nev as nev,
    COUNT(jaratok.id) as jaratDb,
    COUNT(hova.id) as celallomasDb,
    MIN(jaratok.ar) as legolcsobb,
    AVG(jaratok.ar) as atlagar
    FROM legitarsasagok
    JOIN jaratok ON legitarsasagok.id = jaratok.legitarsasag_id
    JOIN repuloterek ON jaratok.honnan_id = repuloterek.id
    JOIN repuloterek AS hova ON jaratok.hova_id = hova.id
    GROUP BY legitarsasagok.nev
    ORDER BY jaratok.jaratszam 
    
    
    `


    const [eredmeny] = await db.query(sql)
    res.json(eredmeny)

})
export default legitarsasagok;