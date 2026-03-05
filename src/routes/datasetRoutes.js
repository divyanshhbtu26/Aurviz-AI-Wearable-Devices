const express = require("express");
const { downloadDataset } = require("../controllers/datasetController");

const router = express.Router();

router.get("/download", downloadDataset);

module.exports = router;