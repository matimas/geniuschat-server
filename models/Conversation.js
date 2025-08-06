const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    role: String,       // "user" או "assistant"
    content: String     // תוכן ההודעה
  }, { _id: false });

const ConversationSchema = new mongoose.Schema({
    persona: String,
    messages: [MessageSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Conversation', ConversationSchema);