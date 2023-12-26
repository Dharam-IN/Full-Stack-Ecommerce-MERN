import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();

// config env
dotenv.config();

// db
connectDB();

// PORT
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`)
})
