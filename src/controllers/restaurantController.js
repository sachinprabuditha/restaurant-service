// restaurantController.js (UPDATED)
const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");

exports.createRestaurant = async (req, res) => {
    try {
        const { name, location } = req.body;

        if (!name || !location) {
            return res.status(400).json({ error: "Name and location are required" });
        }

        const newRestaurant = new Restaurant({ name, location });
        await newRestaurant.save();

        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ isDeleted: false });
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRestaurantAvailability = async (req, res) => {
    try {
        const { isOpen } = req.body;
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, { isOpen }, { new: true });

        if (!updatedRestaurant) return res.status(404).json({ error: "Restaurant not found" });

        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedRestaurant) return res.status(404).json({ error: "Restaurant not found" });

        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        res.status(200).json({ message: "Restaurant deleted (soft delete)", deletedRestaurant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➤ System Stats (New Feature)
exports.getSystemStats = async (req, res) => {
    try {
        const totalRestaurants = await Restaurant.countDocuments({ isDeleted: false });
        const totalMenuItems = await Menu.countDocuments({ isDeleted: false });
        const avgPrice = await Menu.aggregate([
            { $match: { isDeleted: false } },
            { $group: { _id: null, avgPrice: { $avg: "$price" } } }
        ]);

        res.json({
            totalRestaurants,
            totalMenuItems,
            averageMenuPrice: avgPrice[0]?.avgPrice.toFixed(2) || 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
