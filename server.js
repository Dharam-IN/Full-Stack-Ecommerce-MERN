import express from 'express'
import dotenv from 'dotenv'

const app = express();

// config env
dotenv.config();

// PORT
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`)
})
