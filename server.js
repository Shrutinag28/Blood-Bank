const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const cors=require('cors');
const morgan=require('morgan');
const connectDB=require('./config/db');

//dot config
dotenv.config ();

//mongodb connection
connectDB();

//rest object
const app=express();

//middlewares
app.use(express.json())  //to handle json response
app.use(cors())          //to connect react.js and node.js
app.use(morgan('dev'))   //to get info at dev console

//routes 
//1 test route
app.use("/api/v1/test",require("./routes/testRoutes"));
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/inventory",require("./routes/inventoryRoutes"));

//port
const PORT=process.env.PORT || 8080; //help to not get crashed

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`.bgBlue.white);
});