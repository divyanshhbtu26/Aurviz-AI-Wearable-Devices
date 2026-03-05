const archiver = require("archiver");
const datasetQueue = require("../queues/datasetQueue");

exports.downloadDataset = async (req, res, next) => {
  try {
    await datasetQueue.add("generateDataset", {});

    setTimeout(() => {
      res.attachment("dataset.zip");
      const archive = archiver("zip");
      archive.pipe(res);
      archive.directory("dataset/", false);
      archive.finalize();
    }, 2000);

  } catch (error) {
    next(error);
  }
};