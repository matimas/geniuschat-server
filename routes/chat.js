// routes/chat.js
const express = require("express");
const router  = express.Router();
const Conversation = require("../models/Conversation"); // מודל מונגו

// ➊ GET /api/conversations  → מחזיר רשימת שיחות (id+persona+תאריך)
router.get("/conversations", async (_req, res) => {
  const list = await Conversation
    .find({}, "persona createdAt")   // שולף רק שני שדות
    .sort({ createdAt: -1 })         // מסדר מהכי חדש
    .lean();                         // מחזיר אובייקטים פשוטים
  res.json(list);
});

// ➋ GET /api/conversations/:id  → מחזיר שיחה מלאה לפי ID
router.get("/conversations/:id", async (req, res) => {
  const conv = await Conversation.findById(req.params.id).lean();
  res.json(conv);
});

module.exports = router;
