const express = require("express");
const router  = express.Router();
const Conversation = require("../models/Conversation");
const auth = require("../middleware/auth");

/* ➊ רשימת שיחות של המשתמש המחובר */
router.get("/conversations", auth, async (req, res) => {
  const list = await Conversation
    .find({ userId: req.user }, "persona createdAt")
    .sort({ createdAt: -1 })
    .lean();

  res.json(list);
});

/* ➋ שיחה מלאה (רק אם שייכת למשתמש) */
router.get("/conversations/:id", auth, async (req, res) => {
  const conv = await Conversation.findOne({
    _id: req.params.id,
    userId: req.user,
  }).lean();

  if (!conv) return res.status(404).json({ msg: "לא נמצא" });
  res.json(conv);
});

module.exports = router;

