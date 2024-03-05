const express=require('express');
const mongoose=require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const app=express();
app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log(`App is listening to port ${process.env.PORT}`)
})