import db from '../adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const jaratok = express();
jaratok.use(express.json());


jaratok.get('/', async (req, res) => {
    const honnan = req.query.honnan;
    const hova = req.query.hova;
    const legitarsasag = req.query.legitarsasag;


    const sql = `SELECT * FROM jaratok ORDER BY indulas JOIN repuloterek ON jaratok.honnan_id = repuloterek.id`;
    let [rows] = await db.query(sql);
    console.log(rows);
    const eredmeny = rows.filter(jarat => (!honnan || jarat.honnan === honnan) &&
     (!hova || jarat.hova === hova) &&
     (!legitarsasag || jarat.legitarsasag === legitarsasag));

    res.json(eredmeny);
})
export default jaratok;