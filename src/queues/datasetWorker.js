const { Worker } = require("bullmq");
const { connection } = require("../config/redis");
const { generateDataset } = require("../utils/datasetGenerator");

new Worker(
  "datasetQueue",
  async () => {
    await generateDataset();
  },
  { connection }
);