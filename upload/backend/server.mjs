import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.mjs";

import storeRoutes from "./routes/store.route.mjs";
import salesRoutes from "./routes/sales.route.mjs";
import uploadRoutes from "./routes/upload.route.mjs";
import authRoutes from "./routes/auth.route.mjs";

import cors from "cors";
import path from "path";
import { fetchImage } from "./utils/ImageManager.mjs";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // use your actual domain name (or localhost), using * is not recommended
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  }),
);

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows you to parse json from req.body
app.use(cookieParser()); // allows us to parse incoming cookies

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/products/:filename", fetchImage);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

// LISTENER
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
  connectDB();
});
