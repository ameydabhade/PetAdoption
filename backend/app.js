const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const petRoutes = require("./routes/petRoutes");
const adoptionRequestRoutes = require("./routes/adoptionRequestRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
connectDB();
app.use(cors());

app.use(express.json());

// Routes
app.use("/pets", petRoutes);
app.use("/adopt", adoptionRequestRoutes);
app.use("/notifications", notificationRoutes);

module.exports = app;
