const express = require("express");
const { createRestaurant, getRestaurants, updateRestaurant, deleteRestaurant, updateRestaurantAvailability } = require("../controllers/restaurantController");


const router = express.Router();

router.post("/", createRestaurant);  // ❌ Removed "protect"
router.get("/", getRestaurants);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);
router.patch("/:id/availability", updateRestaurantAvailability);

module.exports = router;
