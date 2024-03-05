const express=require('express');
const mongoose=require('mongoose');
const dotenv = require("dotenv");
const path = require("path");
const cors =require("cors");

dotenv.config();
const app=express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("App connected to database");
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening to port ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log(error);
});



