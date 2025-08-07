// models/User.js
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

/* סכמת המשתמש */
const UserSchema = new mongoose.Schema({
  email: {
    type:    String,
    required: true,
    unique:   true,
    trim:     true,
    lowercase:true,
  },
  password: {
    type:    String,
    required: true,
    minlength: 6,
  },
});

/* Hash לפני save */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();     // סיסמה לא שונתה
  this.password = await bcrypt.hash(this.password, 10); // 10 סיבובי salt
  next();
});

/* מתודת אימות־סיסמה */
UserSchema.methods.matchPassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);     // true / false
};

module.exports = mongoose.model("User", UserSchema);
