const Admin = require("../models/Admin");
const Hospital = require("../models/Hospital");

exports.loginAdmin = async(req, res) => {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, password });

    if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Admin login successful" });
};


exports.getPendingHospitals = async(req, res) => {

    try {

        const hospitals = await Hospital.find({ status: "pending" });

        res.json(hospitals);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};


exports.approveHospital = async(req, res) => {

    try {

        const { id } = req.params;

        await Hospital.findByIdAndUpdate(id, { status: "approved" });

        res.json({ message: "Hospital approved successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
exports.deleteHospital = async(req, res) => {
    try {
        const id = req.params.id;

        await Hospital.findByIdAndDelete(id);

        res.json({ message: "Hospital deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting hospital" });
    }
};exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        res.json(hospitals);

    } catch (error) {
        res.status(500).json({ message: "Error fetching hospitals" });
    }
};