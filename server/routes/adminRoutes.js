const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  isAdmin,
} = require("../middleware/roleMiddleware");

const {
  getAllIssues,
} = require("../controllers/adminController");

router.get(
  "/issues",
  authMiddleware,
  isAdmin,
  getAllIssues
);

module.exports = router;