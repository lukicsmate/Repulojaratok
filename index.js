import db from './db.js';
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

