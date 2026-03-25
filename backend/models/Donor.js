const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        default: "Available"
    },
    lastDonation: {
        type: Date
    }
});

module.exports = mongoose.model("Donor", donorSchema);