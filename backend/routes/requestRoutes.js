const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const { createRequest, getAllRequests, deleteRequest } = require("../controllers/requestController");

router.post("/create", auth, createRequest);
router.get("/all", getAllRequests);
router.delete("/delete/:id", auth, deleteRequest);

module.exports = router;