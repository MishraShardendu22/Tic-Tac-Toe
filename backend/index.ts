import express from "express";
const app = express();


import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;


// Test Commnand Start
app.get("/", (req,res) => {
  res.status(200).json({"message" : "This is a test command to check if the server is running !!"});
})
// Test Commnand End


// Start the server
app.listen(PORT, () => {
  console.log(`Click to connect : http://localhost:${PORT}`);
  console.log(`Server is running on port ${PORT}`);
})