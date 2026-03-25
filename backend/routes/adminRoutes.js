const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/login", adminController.loginAdmin);

router.get("/hospitals/pending", adminController.getPendingHospitals);
router.get("/hospitals", adminController.getAllHospitals);

router.put("/hospital/approve/:id", adminController.approveHospital);
router.delete("/hospital/delete/:id", adminController.deleteHospital);

module.exports = router;