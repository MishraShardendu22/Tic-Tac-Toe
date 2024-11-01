import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data (forms)
app.use(express.json());                         // Parses JSON data
app.use(cookieParser());                         // Parses cookies
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// Test Command Start
app.get("/", (req, res) => {
  res.status(200).json({ "message": "This is a test command to check if the server is running!" });
});
// Test Command End

const allUsers = {}
const allRooms = []



io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Click to connect : http://localhost:${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});