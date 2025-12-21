const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

const db_connect = require("./config/connect");
const initSocket = require("./socket");

const adminroute = require("./routes/resourceroutes");
const userroute = require("./routes/searchroutes");
const authRoute = require("./routes/authRoutes");

dotenv.config();

const app = express();
db_connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/admin", adminroute);
app.use("/user", userroute);
app.use("/uploads", express.static("uploads"));

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
