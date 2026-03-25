const express = require("express");
const router = express.Router();

const { registerDonor, searchDonors, getDonorCount } = require("../controllers/donorController");

router.post("/register", registerDonor);
router.get("/search", searchDonors);
router.get("/count", getDonorCount);
const Donor = require("../models/Donor");

router.delete("/delete/:id", async(req, res) => {
    try {
        const { id } = req.params;

        await Donor.findByIdAndDelete(id);

        res.json({ message: "Donor deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;