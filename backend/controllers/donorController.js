const Donor = require("../models/Donor");

// ================= REGISTER DONOR =================
exports.registerDonor = async(req, res) => {
    try {
        const { name, bloodGroup, city, phoneNumber, lastDonationDate } = req.body;

        const newDonor = new Donor({
            name,
            bloodGroup,
            city,
            phone: phoneNumber,
            lastDonation: lastDonationDate || null
        });

        await newDonor.save();

        return res.status(201).json({
            message: "Donor registered successfully",
            donor: newDonor
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

// ================= SEARCH DONORS =================
exports.searchDonors = async(req, res) => {
    try {
        const { bloodGroup, city } = req.query;

        const donors = await Donor.find({
            bloodGroup: { $regex: bloodGroup, $options: "i" },
            city: { $regex: city, $options: "i" }

        });
        console.log("DEBUG RUNNING NEW CODE");
        const updatedDonors = donors.map(donor => {

            if (!donor.lastDonation) {
                return {...donor._doc, status: "Eligible" };
            }

            const last = new Date(donor.lastDonation);
            const today = new Date();

            // FIX: handle future dates
            let diffDays = (today - last) / (1000 * 60 * 60 * 24);

            if (diffDays < 0) {
                diffDays = 0; // treat future as just donated
            }

            let status;

            if (diffDays >= 90) {
                status = "Eligible";
            } else {
                status = "Recently Donated";
            }

            return {
                ...donor._doc,
                status
            };
        });

        return res.json({
            count: updatedDonors.length,
            donors: updatedDonors
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

// ================= DONOR COUNT =================
exports.getDonorCount = async(req, res) => {
    try {
        const count = await Donor.countDocuments();

        return res.json({
            count
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};