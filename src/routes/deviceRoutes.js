const express = require("express");
const { getDeviceAudio } = require("../controllers/deviceController");

const router = express.Router();

router.get("/:device_id/audio", getDeviceAudio);

module.exports = router;