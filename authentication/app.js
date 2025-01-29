require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const router = require("./router");

app.use(cors());

app.use(express.json());

app.use("/Workshop", router);

const port = process.env.PORT;

app.listen(port,()=>{
  console.log(`running on port ${port}`);
});
