// routes/auth.js
const express = require("express");
const jwt     = require("jsonwebtoken");
const User    = require("../models/User");

const router = express.Router();

/* פונקציה קטנה שמייצרת JWT */
const genToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "2h" });

/* -------- 1) REGISTER --------
   POST /api/auth/register { email, password }
--------------------------------*/
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  /* 1. אימות נתונים בסיסי */
  if (!email || !password) {
    return res.status(400).json({ msg: "נדרש אימייל וסיסמה" });
  }

  /* 2. בדיקה אם קיים משתמש */
  if (await User.findOne({ email })) {
    return res.status(400).json({ msg: "משתמש כבר רשום" });
  }

  /* 3. יצירה + הצפנת סיסמה (ב-UserSchema כבר מוצפן) */
  const user = await User.create({ email, password });

  /* 4. החזרת JWT */
  res.json({ token: genToken(user._id) });
});

/* -------- 2) LOGIN --------
   POST /api/auth/login { email, password }
------------------------------*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ msg: "אימייל או סיסמה שגויים" });
  }

  res.json({ token: genToken(user._id) });
});

module.exports = router;

