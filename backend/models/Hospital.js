const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);