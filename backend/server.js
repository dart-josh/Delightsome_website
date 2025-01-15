import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";

import storeRoutes from "./routes/store.route.js"
import { app, server } from "./socket/socket.js";

import cors from 'cors';

app.use(cors({
    origin: 'http://localhost:5173', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))



dotenv.config();



const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows you to parse json from req.body

// ROUTES
app.use("/api/store", storeRoutes)

// LISTENER
server.listen(PORT, () => {
  console.log("Server started on port", PORT);

  connectDB();
});
