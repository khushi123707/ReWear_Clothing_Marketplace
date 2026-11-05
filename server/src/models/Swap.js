import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  clothing: { type: mongoose.Schema.Types.ObjectId, ref: "Clothing", required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listingOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  message: { type: String, default: "" },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Swap", swapSchema);
