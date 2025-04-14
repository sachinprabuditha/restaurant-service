const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    category: {
        type: String,
        enum: ["Starter", "Main", "Dessert", "Drink", "Other"],
        default: "Other"
    },
    isDeleted: { type: Boolean, default: false } // 👈 NEW
}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);
