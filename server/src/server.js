import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import clothesRoutes from "./routes/clothes.js";
import swapRoutes from "./routes/swaps.js";
import { seedClothes } from "./data/seed.js";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "http://localhost:5173" }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true, message: "ReWear API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/clothes", clothesRoutes);
app.use("/api/swaps", swapRoutes);
app.post("/api/newsletter", (req, res) => {
  if (!req.body.email) return res.status(400).json({ message: "Email is required." });
  res.json({ message: "Thanks for joining the ReWear community!" });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected.");
    await seedClothes();
    app.listen(PORT, () => console.log(`ReWear API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
