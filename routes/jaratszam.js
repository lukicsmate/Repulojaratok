import db from '../adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const jaratszam = express();
jaratszam.use(express.json());


jaratszam.get('/:jaratszam', async (req,res)=>{
    const jaratszamP = req.params.jaratszam;

    const sql = `SElECT jaratszam, 
    legitarsasagok.nev as legitarsasag_nev,
    legitarsasagok.kod as legitarsasag_kod,
    honnan.kod as honnan_kod,
    hova.kod as hova_kod,
    indulas,
    idotartam,
    ar
    FROM jaratok 
    JOIN repuloterek AS honnan ON jaratok.honnan_id = honnan.id 
    JOIN repuloterek AS hova ON jaratok.hova_id = hova.id 
    JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id WHERE jaratszam = ?`;

    const [eredmeny] = await db.query(sql,[jaratszamP]);

    if(eredmeny.length === 0){return res.status(404).send("nincs ilyen járat")}

    return res.json(eredmeny);
})
export default jaratszam