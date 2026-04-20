require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Audit DB connected"))
  .catch(err => console.log(err));

app.use("/", require("./routes/auditRoutes"));

app.listen(process.env.PORT, (req, res) =>
  console.log(`Audit Service running on ${process.env.PORT}`)
);