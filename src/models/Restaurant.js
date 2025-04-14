const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    isOpen: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false } // 👈 NEW
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);
