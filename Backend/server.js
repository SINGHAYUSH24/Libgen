const express=require("express");
const adminroute=require("./routes/resourceroutes");
const userroute=require("./routes/searchroutes");
const cors=require('cors');
const app=express();
const db=require("./config/connect");
app.use(cors());
app.use("/admin",adminroute);
app.use("/user",userroute);
app.use(express.json());
app.use("/uploads",express.static("uploads"));
db();
app.listen(2000,()=>{
    console.log("Starting Server at Port 2000");
})