import db from './adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';
import jaratok from './routes/jaratok.js'
import jaratszam from './routes/jaratszam.js';
import repuloterek from './routes/repuloterek.js';
import repuloterekByKod from './routes/repuloterekByKod.js'
import repuloterekIndulasok from './routes/repuloterekIndulasok.js';
import legitarsasagok from './routes/legitarsasagok.js';
const app = express();
app.use(express.json());

app.use('/jaratok',jaratszam)
app.use('/jaratok',jaratok);
app.use(repuloterekByKod)
app.use('/repuloterek',repuloterek)
app.use(repuloterekIndulasok)
app.use('/legitarsasagok',legitarsasagok)
app.listen(3000,()=>{
	console.log(`Server is running at http://localhost:3000`);
})