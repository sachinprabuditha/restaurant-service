const express = require("express");
const {
    createMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
    updateAvailability,
    bulkCreateMenuItems
} = require("../controllers/menuController");
const { validateMenu } = require("../middlewares/validateMiddleware");

const router = express.Router();

router.post("/:restaurantId", validateMenu, createMenuItem);
router.post("/:restaurantId/bulk", bulkCreateMenuItems); // 👈 NEW
router.get("/:restaurantId", getMenuItems);
router.put("/:id", validateMenu, updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.patch("/:id/availability", updateAvailability);

module.exports = router;
