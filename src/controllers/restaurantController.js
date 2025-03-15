const Restaurant = require("../models/Restaurant");

exports.createRestaurant = async (req, res) => {
    try {
        const { name, location } = req.body;
        const newRestaurant = new Restaurant({ name, location, owner: req.user.id });
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
