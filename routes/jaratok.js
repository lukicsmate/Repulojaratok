import db from '../adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const jaratok = express();
jaratok.use(express.json());


jaratok.get('/', async (req, res) => {
    const honnan = req.query.honnan;
    const hova = req.query.hova;
    const legitarsasag = req.query.legitarsasag;
    const honnanUP = typeof honnan === "undefined" ? undefined : typeof honnan === "string" ? honnan.toUpperCase() : undefined;
    const hovaUP = typeof hova === "undefined" ? undefined : typeof hova === "string" ? hova.toUpperCase() : undefined;
    const legitarsasagUP = typeof legitarsasag === "undefined" ? undefined : typeof legitarsasag === "string" ? legitarsasag.toUpperCase() : undefined;

    if(hova.length > 3 || honnan.length > 3){return res.status(400).send("a honnan es a hova field 3 betű max")}
    
    

    const sql = `SELECT jaratszam, 
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
    JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id
    ORDER BY indulas `;
    let [rows] = await db.query(sql);
    if(rows.length == 0){return res.status(404).send("nincs ilyen adat a rendszerben")}
    console.log(rows);
    console.log("honnanup "+honnanUP);
    console.log("hovaup "+hovaUP);
    rows = rows.filter(jarat => 
     (!honnanUP || jarat.honnan_kod == honnanUP) &&
     (!hovaUP || jarat.hova_kod == hovaUP) &&
     (!legitarsasagUP || jarat.legitarsasag_kod == legitarsasagUP)
    );

    res.json(rows);
})
export default jaratok;