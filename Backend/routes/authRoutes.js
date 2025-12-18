const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    adminSignup,
} = require("../controllers/authControllers");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/admin/signup", protect, isAdmin, adminSignup);

module.exports = router;
