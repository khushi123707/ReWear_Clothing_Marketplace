import express from "express";
import Clothing from "../models/Clothing.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = { status: "available" };
    if (req.query.category && req.query.category !== "All") filter.category = req.query.category;
    if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };
    const items = await Clothing.find(filter).populate("owner", "name city").sort({ createdAt: -1 });
    res.json(items);
  } catch { res.status(500).json({ message: "Could not load clothes." }); }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Clothing.findById(req.params.id).populate("owner", "name city");
    if (!item) return res.status(404).json({ message: "Clothing item not found." });
    res.json(item);
  } catch { res.status(400).json({ message: "Invalid clothing ID." }); }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title, description, category, size, condition, image } = req.body;
    if (!title || !category || !image) return res.status(400).json({ message: "Title, category and image URL are required." });
    const item = await Clothing.create({ title, description, category, size, condition, image, owner: req.user._id, ownerName: req.user.name });
    res.status(201).json(item);
  } catch { res.status(500).json({ message: "Could not add clothing." }); }
});

export default router;
