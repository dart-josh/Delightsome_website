const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./utils/db.js");

const storeRoutes = require("./routes/store.route.js");
const { app, server } = require("./socket/socket.js");

const cors = require('cors');
const path = require("path");

app.use(cors({
    origin: 'http://localhost:5173', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}));

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows you to parse json from req.body

// ROUTES
app.use("/api/store", storeRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
  });
}

// LISTENER
server.listen(PORT, () => {
  console.log("Server started on port", PORT);
  connectDB();
});