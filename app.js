const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const recordRoutes = require("./routes/recordRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const notFound = require("./middleware/notFound.js");
const errorHandler = require("./middleware/errorMiddleware.js");

// require("dotenv").config();
// dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Finance Dashboard Backend API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
