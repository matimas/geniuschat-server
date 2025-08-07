const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./database/dbconnection");

/* ☑️ CORS – הרשאות */

const allowedOrigins = [
  "http://localhost:3000",
  "https://geniuschat-client.netlify.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true          
  })
);


app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const chatRoutes = require("./routes/chat"); 
app.use("/api", chatRoutes);

const routes = require("./routes");
app.use("/api", routes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
