require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/menu", require("./routes/menuRoutes")); // 👈 Added menu routes
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
