const express = require("express");
const { body } = require("express-validator");
const protect = require("../middleware/authMiddleware.js");
const authorize = require("../middleware/roleMiddleware.js");
const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController.js");
const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(
    authorize("admin"),
    [
      body("amount")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than 0"),
      body("type")
        .isIn(["income", "expense"])
        .withMessage("Type must be income or expense"),
      body("category").notEmpty().withMessage("Category is required"),
      body("date").isISO8601().withMessage("Valid date is required"),
    ],
    createRecord,
  )
  .get(authorize("analyst", "admin"), getRecords);

router
  .route("/:id")
  .get(authorize("analyst", "admin"), getRecordById)
  .patch(authorize("admin"), updateRecord)
  .delete(authorize("admin"), deleteRecord);

module.exports = router;
