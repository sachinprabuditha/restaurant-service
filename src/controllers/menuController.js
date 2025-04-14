// menuController.js (UPDATED)
const Menu = require("../models/Menu");
const Restaurant = require("../models/Restaurant");

// ➤ Create a Menu Item
exports.createMenuItem = async (req, res) => {
    try {
        const { name, price, availability, category } = req.body;
        const { restaurantId } = req.params;

        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required" });
        }

        const newMenuItem = new Menu({ restaurant: restaurantId, name, price, availability, category });
        await newMenuItem.save();

        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➤ Bulk Create Menu Items
exports.bulkCreateMenuItems = async (req, res) => {
    try {
        const { items } = req.body;
        const { restaurantId } = req.params;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Items must be a non-empty array" });
        }

        const menuItems = items.map(item => ({ ...item, restaurant: restaurantId }));
        const savedItems = await Menu.insertMany(menuItems);

        res.status(201).json(savedItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➤ Get All Menu Items for a Restaurant
exports.getMenuItems = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { page = 1, limit = 10, search = "", minPrice, maxPrice, category } = req.query;

        let query = { restaurant: restaurantId, isDeleted: false };

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }

        const menuItems = await Menu.find(query)
            .populate("restaurant", "name location isOpen")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const totalItems = await Menu.countDocuments(query);

        res.status(200).json({
            totalItems,
            currentPage: Number(page),
            totalPages: Math.ceil(totalItems / limit),
            menuItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➤ Update a Menu Item
exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedItem) return res.status(404).json({ error: "Menu item not found" });

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➤ Delete a Menu Item (Soft Delete)
exports.deleteMenuItem = async (req, res) => {
    try {
        const deletedItem = await Menu.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        res.status(200).json({ message: "Menu item deleted (soft delete)", deletedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➤ Update Menu Item Availability
exports.updateAvailability = async (req, res) => {
    try {
        const { availability } = req.body;
        const updatedItem = await Menu.findByIdAndUpdate(req.params.id, { availability }, { new: true });

        if (!updatedItem) return res.status(404).json({ error: "Menu item not found" });

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
