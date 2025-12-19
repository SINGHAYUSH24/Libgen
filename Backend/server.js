const express = require("express");
const dotenv = require("dotenv");
const db_connect = require("./config/connect");
const cors = require("cors");

const adminroute = require("./routes/resourceroutes");
const userroute = require("./routes/searchroutes");
const authRoute = require("./routes/authRoutes");
const app = express();
dotenv.config();
db_connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/auth", authRoute);
app.use("/admin", adminroute);
app.use("/user", userroute);
app.use("/uploads", express.static("uploads"));

app.listen(2000, () => {
    console.log("Starting Server at Port 2000");
});
