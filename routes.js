const express = require('express');
const router = express.Router();
const OpenAI = require("openai");
require('dotenv').config();
const Conversation = require('./models/Conversation');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/chat', async (req, res) => {
  const { personaPrompt, messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: personaPrompt },
        ...messages
      ]
    });

    const reply = completion.choices[0].message.content;

    // שמירת השיחה במסד
    await Conversation.create({
      persona: personaPrompt,
      messages: [...messages, { role: "assistant", content: reply }]
    });

    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
