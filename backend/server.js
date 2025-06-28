const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const campaignRoutes = require("./routes/campaign");

const app = express();

// ✅ Enable CORS for frontend running on port 3000
app.use(cors())

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/", campaignRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/medchain", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
