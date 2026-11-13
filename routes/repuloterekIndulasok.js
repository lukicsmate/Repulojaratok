import db from '../adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const repuloterekIndulasok = express();
repuloterekIndulasok.use(express.json());


repuloterekIndulasok.get('/repuloterek/:kod/indulasok',async (req,res)=>{
    const kod = req.params.kod;

    const sql = `SELECT
    indulas,
    jaratszam,
    legitarsasagok.nev,
    hova.nev as celallomas,
    ADDTIME(indulas, SEC_TO_TIME(idotartam * 60)) as erkezes
    FROM jaratok 
    JOIN repuloterek AS honnan ON jaratok.honnan_id = honnan.id 
    JOIN repuloterek AS hova ON jaratok.hova_id = hova.id 
    JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id
    WHERE honnan.kod = ?
    ORDER BY indulas
    `
    const [eredmeny] = await db.query(sql,[kod]);
    res.json(eredmeny);
})
export default repuloterekIndulasok;