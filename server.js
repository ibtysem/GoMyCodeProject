console.clear();
const express = require("express");
const app = express();
require("dotenv").config();
const DBconnect = require("./config/dbconnect");
const cors = require("cors");

//routes
app.use(express.json());
app.use(cors());
app.use("/admin", require("./routes/admin"));
app.use("/localiteur", require("./routes/localiteur"));
app.use("/user", require("./routes/user"));
app.use("/userauth", require("./routes/userauth"));
app.use("/localauth", require("./routes/localauth"));

//connect to db
DBconnect();

//server
const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log("server is runing PORT " + PORT)
);
