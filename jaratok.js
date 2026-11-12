import db from './db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const jaratok = express();
jaratok.use(express.json());


jaratok.get('/', async (req, res) => {
    const honnan = req.query.honnan;
    const hova = req.query.hova;
    const legitarsasag = req.query.legitarsasag;


    const sql = `SELECT * FROM jaratok ORDER BY indulas`;
    let [rows] = await db.query(sql);

    const eredmeny = rows.filter(jarat => (!honnan || jarat.honnan === honnan) && (!hova || jarat.hova === hova) && (!legitarsasag || jarat.legitarsasag === legitarsasag));

    res.json(eredmeny);
})