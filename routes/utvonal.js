import db from '../adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const utvonal = express();
utvonal.use(express.json());

function minutesToTime(totalMinutes) {
    const minutesInDay = 24 * 60;
    const timeOfDay = ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay;
    const hours = Math.floor(timeOfDay / 60);
    const minutes = timeOfDay % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}
function timeToMinutes(time) {
    const [hours, minutes, seconds = 0] = time.split(':').map(Number);
    return hours * 60 + minutes + seconds / 60;
}
utvonal.get('/',async (req,res)=>{
    const honnan = req.query.honnan;
    const hova = req.query.hova;


    const sqlAtszallasTol = `SELECT 
    jaratok.ar AS ar,
    legitarsasagok.kod AS legitarsasag_kod,
    honnan.id AS atszallas_id,
    honnan.nev AS atszallas,
    honnan.kod AS atszallas_honnan_kod,
    idotartam,
    indulas AS atszallas_indulas
    FROM jaratok
    JOIN repuloterek as honnan ON honnan.id = jaratok.honnan_id
    JOIN repuloterek as hova ON hova.id = jaratok.hova_id
    JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id
    WHERE hova.kod = ?
    `    
    const [atszallas_eredmeny] = await db.query(sqlAtszallasTol,[hova])
    console.log("atszallas "+JSON.stringify(atszallas_eredmeny))

    const sqlindulastol = `SELECT
    jaratok.ar AS ar,
    legitarsasagok.kod AS legitarsasag_kod,
    honnan.id AS indulas_id,
    honnan.nev AS indulas,
    honnan.kod AS indulas_honnan_kod,
    hova.nev AS indulas_hova_nev,
    hova.kod AS indulas_hova_kod,
    indulas as indulas,
    idotartam
    FROM jaratok
    JOIN repuloterek as honnan ON honnan.id = jaratok.honnan_id
    JOIN repuloterek as hova ON hova.id = jaratok.hova_id
    JOIN legitarsasagok ON jaratok.legitarsasag_id = legitarsasagok.id
    WHERE honnan.kod = ?
    `
    const [indulas_eredmeny] = await db.query(sqlindulastol,[honnan])
    console.log("indulas "+JSON.stringify(indulas_eredmeny))
    const [vegeredmeny] = indulas_eredmeny.flatMap(indulas =>
        { const erkezesPerc = (timeToMinutes(indulas.indulas) + indulas.idotartam);
            
            return atszallas_eredmeny
            .filter(atszallas=>
                            indulas.indulas_hova_kod === atszallas.atszallas_honnan_kod
            )
            .map(atszallas => ({
                
                elso:indulas.legitarsasag_kod,
                masodik:atszallas.legitarsasag_kod,
                atszallas:atszallas.atszallas_honnan_kod,
                indulas:indulas.indulas,
                erkezes:minutesToTime(erkezesPerc+timeToMinutes(atszallas.atszallas_indulas)+atszallas.idotartam),
                varakozas:timeToMinutes(atszallas.atszallas_indulas)-erkezesPerc,
                osszAr:(indulas.ar+atszallas.ar)})
            )
        })
        
        


    
    return res.json(vegeredmeny)

})
export default utvonal;