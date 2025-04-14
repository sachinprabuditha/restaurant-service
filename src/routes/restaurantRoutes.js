const express = require("express");
const {
    createRestaurant,
    getRestaurants,
    updateRestaurant,
    deleteRestaurant,
    updateRestaurantAvailability,
    getSystemStats // 👈 NEW
} = require("../controllers/restaurantController");

const router = express.Router();

router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.get("/stats", getSystemStats); // 👈 NEW
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);
router.patch("/:id/availability", updateRestaurantAvailability);

module.exports = router;
