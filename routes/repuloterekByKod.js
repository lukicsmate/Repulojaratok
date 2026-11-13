import db from '../adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const repuloterekByKod = express();
repuloterekByKod.use(express.json());





repuloterekByKod.get('/repuloterek/:kod',async (req,res)=>{
    const kod = req.params.kod;

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
    HAVING repuloterek_kod = ?
    ORDER BY nev desc`

    const [eredmeny] = await db.query(sql,[kod]);
    if (eredmeny.length===0){return res.status(404).send("nincs ilyen repülőtér")}
    return res.json(eredmeny)

})
export default repuloterekByKod;