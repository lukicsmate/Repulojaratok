import db from './adat/db.js';
import express from 'express';
import mysql from 'mysql2/promise';
import jaratok from './routes/jaratok.js'

const app = express();
app.use(express.json());

app.use('/jaratok',jaratok);
app.listen(3000,()=>{
	console.log(`Server is running at http://localhost:3000`);
})