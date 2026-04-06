const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const authorize = require("../middleware/roleMiddleware.js");
const {
  getDashboardSummary,
} = require("../controllers/dashboardController.js");

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("viewer", "analyst", "admin"),
  getDashboardSummary,
);

module.exports = router;
