// routes.js
const express = require("express");
const { signup, login } = require("../controller/authController");
const { auth, allowedTo } = require("../middleware/authMiddleware");
const {
  getPublic,
  getProtected,
  getAdmin,
  getSubAdmin,
} = require("../controller/userController");
const validateUser = require("../validator/validateUser");

const router = express.Router();

router.post("/signup", validateUser, signup);
router.post("/login", login);
router.get("/public", getPublic);
router.get("/protected", auth, allowedTo("user"), getProtected);
router.get("/admin", auth, allowedTo("admin"), getAdmin);
router.get("/subAdmin", auth, allowedTo("subAdmin"), getSubAdmin);

module.exports = router;
