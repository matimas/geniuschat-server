const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("📦 התחברת למונגוDB");
}).catch(err => {
  console.error("❌ שגיאה בהתחברות ל־MongoDB:", err);
});
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const chatRoutes = require("./routes/chat"); // הנתיב היחסי

const routes = require("./routes");

app.use(cors());
app.use("/api", chatRoutes);


app.use("/api", routes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
