const express = require("express");
const router = express.Router();

const { getOptimalRoute } = require("../controllers/routeController");

router.get("/optimize", getOptimalRoute);

module.exports = router;