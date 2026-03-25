const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    unitsNeeded: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },

    urgency: {
        type: String,
        default: "Normal"
    },
    phone: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: "LOW"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);