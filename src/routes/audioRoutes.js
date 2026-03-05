const express = require("express");
const { body } = require("express-validator");
const upload = require("../utils/multerConfig");
const { uploadAudio } = require("../controllers/audioController");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post(
  "/upload",
  upload.single("audio"),
  body("device_id").notEmpty(),
  body("transcription").notEmpty(),
  validateRequest,
  uploadAudio
);

module.exports = router;