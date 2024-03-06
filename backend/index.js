const express=require('express');
const mongoose=require('mongoose');
const dotenv = require("dotenv");
const path = require("path");
const cors =require("cors");
const pinRoute=require("./routes/pins")
const usersRoute=require("./routes/users")


//use cors 

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("App connected to database");
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening to port ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log(error);
});

app.use('/api/pins',pinRoute);
app.use('/api/users',usersRoute);




