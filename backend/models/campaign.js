const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  campaignID:String,
  title: String,
  condition: String,
  description: String,
  goalAmount: Number,
  raisedAmount: Number,
  withdrawn: Boolean,
  deadline: String
});

module.exports = mongoose.model("Campaign", campaignSchema);
