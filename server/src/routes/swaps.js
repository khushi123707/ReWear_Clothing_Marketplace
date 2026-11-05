import express from "express";
import Swap from "../models/Swap.js";
import Clothing from "../models/Clothing.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { clothingId, message } = req.body;
    const clothing = await Clothing.findById(clothingId);
    if (!clothing || clothing.status !== "available") return res.status(404).json({ message: "This item is no longer available." });
    if (clothing.owner && String(clothing.owner) === String(req.user._id)) return res.status(400).json({ message: "You cannot request your own item." });
    const swap = await Swap.create({ clothing: clothing._id, requester: req.user._id, listingOwner: clothing.owner, message });
    res.status(201).json(swap);
  } catch { res.status(500).json({ message: "Could not send swap request." }); }
});

router.get("/my", protect, async (req, res) => {
  const swaps = await Swap.find({ $or: [{ requester: req.user._id }, { listingOwner: req.user._id }] })
    .populate("clothing").populate("requester", "name email").sort({ createdAt: -1 });
  res.json(swaps);
});

router.patch("/:id", protect, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id).populate("clothing");
    if (!swap) return res.status(404).json({ message: "Request not found." });
    if (!swap.listingOwner || String(swap.listingOwner) !== String(req.user._id))
      return res.status(403).json({ message: "Only the listing owner can update this request." });
    if (!["accepted", "rejected"].includes(req.body.status)) return res.status(400).json({ message: "Invalid status." });
    swap.status = req.body.status;
    await swap.save();
    if (swap.status === "accepted" && swap.clothing) {
      swap.clothing.status = "swapped";
      await swap.clothing.save();
    }
    res.json(swap);
  } catch { res.status(400).json({ message: "Could not update request." }); }
});

export default router;
