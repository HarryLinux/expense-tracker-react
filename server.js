const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3001;

dotenv.config();

connectDB();

const transactions = require("./routes/transactions");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/transactions", transactions);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
