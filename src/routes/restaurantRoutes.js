const express = require("express");
const { createRestaurant, getRestaurants, updateRestaurant, deleteRestaurant } = require("../controllers/restaurantController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createRestaurant);
router.get("/", getRestaurants);
router.put("/:id", protect, updateRestaurant);
router.delete("/:id", protect, deleteRestaurant);

module.exports = router;
