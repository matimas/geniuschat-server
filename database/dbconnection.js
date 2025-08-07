require("dotenv").config();
const mongoose = require("mongoose");

dbconnect = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("📦 התחברת למונגוDB");
}).catch(err => {
    console.error("❌ שגיאה בהתחברות ל־MongoDB:", err);
});

module.exports = { dbconnect };

