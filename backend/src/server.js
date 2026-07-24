import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://real-time-chat-psi-mauve.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Simple backend health check
app.get("/", (req, res) => {
  res.json({
    message: "Real-Time Chat API is running",
  });
});

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});