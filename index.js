const express = require("express");
const requestIp = require("request-ip");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const db = require("./DB/db.js");
const router = require("./routes/routes.js");

// const conn = require("./conn/conn");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIp.mw());

const port = 3000;

app.use("/api", router);

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
