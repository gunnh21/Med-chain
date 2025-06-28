const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign.js");

router.get('/',(req,res)=>{
  res.send("Hello World")
})

// GET campaign by ID

router.get("/:id", async (req, res) => {
  try {
    console.log("Entered get Campaign");
    console.log(req.params.id);
    
    
    const campaign = await Campaign.findOne({ campaignID: req.params.id });
    console.log(campaign);
    
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: "Error fetching campaign" });
  }
});

// POST donate
router.post("/:id/donate", async (req, res) => {
  try {
    const { amount } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    campaign.raisedAmount += amount;
    await campaign.save();
    res.json({ message: "Donation successful", raisedAmount: campaign.raisedAmount });
  } catch (err) {
    res.status(500).json({ message: "Error processing donation" });
  }
});

// POST withdraw
router.post("/:id/withdraw", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    if (campaign.withdrawn) return res.status(400).json({ message: "Funds already withdrawn." });
    if (campaign.raisedAmount < campaign.goalAmount)
      return res.status(400).json({ message: "Goal not yet reached. Cannot withdraw." });

    campaign.withdrawn = true;
    await campaign.save();
    res.json({ message: "✅ Withdrawal successful. Funds transferred to the fundraiser." });
  } catch (err) {
    res.status(500).json({ message: "Error withdrawing funds" });
  }
});

module.exports = router;
