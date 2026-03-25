const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

router.post("/signup", hospitalController.signupHospital);

// 👉 ADD THIS LINE
router.post("/login", hospitalController.loginHospital);

module.exports = router;