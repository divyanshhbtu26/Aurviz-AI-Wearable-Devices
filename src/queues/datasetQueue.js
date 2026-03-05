const { Queue } = require("bullmq");
const { connection } = require("../config/redis");

const datasetQueue = new Queue("datasetQueue", {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,  // removes job after success
    removeOnFail: true       // removes job after failure
  }
});

module.exports = datasetQueue;