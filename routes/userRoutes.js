const express = require("express");
const { body } = require("express-validator");
const protect = require("../middleware/authMiddleware.js");
const authorize = require("../middleware/roleMiddleware.js");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .post(
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Valid email is required"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
      body("role")
        .isIn(["viewer", "analyst", "admin"])
        .withMessage("Role must be viewer, analyst, or admin"),
      body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Status must be active or inactive"),
    ],
    createUser,
  )
  .get(getUsers);

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
