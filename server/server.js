require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./database/db.js");
const { readdirSync } = require("fs");

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());
//middlewares

//routes
readdirSync("./routes").map((route) =>
  app.use("/", require("./routes/" + route))
);
//routes

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server ${PORT} Portunda Çalışıyor`);
  });
};

server();
