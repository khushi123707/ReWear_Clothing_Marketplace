import mongoose from "mongoose";

const clothingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  category: { type: String, required: true },
  size: { type: String, default: "M" },
  condition: { type: String, default: "Good" },
  image: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  ownerName: { type: String, default: "ReWear Community" },
  status: { type: String, enum: ["available", "swapped"], default: "available" }
}, { timestamps: true });

export default mongoose.model("Clothing", clothingSchema);
