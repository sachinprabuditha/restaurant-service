const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);
