const jwt = require("jsonwebtoken");
const Hospital = require("../models/Hospital");
// SIGNUP (already exists)
exports.signupHospital = async(req, res) => {

    try {

        const { name, email, password, city, phone } = req.body;

        const existing = await Hospital.findOne({ email });

        if (existing) {
            return res.status(400).json({ message: "Hospital already exists" });
        }

        const hospital = new Hospital({
            name,
            email,
            password,
            city,
            phone
        });

        await hospital.save();

        res.json({
            message: "Hospital registered successfully. Waiting for admin approval."
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};


// 👉 ADD THIS BELOW (login function)

exports.loginHospital = async(req, res) => {

    try {

        const { email, password } = req.body;

        const hospital = await Hospital.findOne({ email });

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        if (hospital.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        if (hospital.status !== "approved") {
            return res.status(403).json({ message: "Hospital not approved yet" });
        }

        const token = jwt.sign({ id: hospital._id },
            "secretKey", { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};