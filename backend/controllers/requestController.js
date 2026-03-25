const axios = require("axios");
const BloodRequest = require("../models/BloodRequest");
exports.createRequest = async(req, res) => {
    try {
        const { hospitalName, bloodGroup, unitsNeeded, city, urgency, phone } = req.body;

        // 🔥 Call Lambda
        let priority = "LOW";

        try {
            const lambdaRes = await axios.post(process.env.LAMBDA_URL, {
                bloodGroup: bloodGroup,
                units: Number(unitsNeeded)
            });

            priority = lambdaRes.data.priority;

        } catch (error) {
            console.log("Lambda Error:", error.message);
        }

        // Save request with priority
        const request = new BloodRequest({
            hospitalName,
            bloodGroup,
            unitsNeeded,
            city,
            urgency,
            phone,
            priority // 🔥 added
        });

        await request.save();

        res.status(201).json({
            message: "Blood request created successfully",
            priority: priority,
            request
        });

    } catch (error) {
        console.log("ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.getAllRequests = async(req, res) => {
    try {
        const requests = await BloodRequest.find();

        res.json({
            count: requests.length,
            requests
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteRequest = async(req, res) => {
    try {
        const id = req.params.id;

        await BloodRequest.findByIdAndDelete(id);

        res.json({ message: "Request deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting request" });
    }
};