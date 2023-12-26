import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './router/authRouter.js';
import cors from 'cors'


// rest object
const app = express();

// config env
dotenv.config();

// db
connectDB();

// middleware
app.use(express.json())

// Routes
app.use(cors())
app.use('/api/v1/auth', authRoutes)

// PORT
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`)
})
