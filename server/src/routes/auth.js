import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const makeToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, city: u.city });

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, city } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required." });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
    if (await User.findOne({ email })) return res.status(409).json({ message: "An account with this email already exists." });
    const user = await User.create({ name, email, city, password: await bcrypt.hash(password, 10) });
    res.status(201).json({ token: makeToken(user._id), user: publicUser(user) });
  } catch (e) { res.status(500).json({ message: "Could not create account." }); }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password || "", user.password)))
      return res.status(401).json({ message: "Email or password is incorrect." });
    res.json({ token: makeToken(user._id), user: publicUser(user) });
  } catch { res.status(500).json({ message: "Could not login." }); }
});

router.get("/me", protect, (req, res) => res.json({ user: publicUser(req.user) }));
export default router;
