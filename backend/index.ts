import colors from "colors";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

import express from "express";
const app = express();

// Test Commnand Start

app.get("/", (req,res) => {
  res.status(200).send("This is a test command to check if the server is running !!");
})

// Test Commnand End

app.listen(PORT, () => {
  console.log(`Click to connect : http://localhost:${PORT}`.green.bold);
  console.log(`Server is running on port ${PORT}`.blue.bold);
})