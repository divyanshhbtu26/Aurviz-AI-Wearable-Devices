const fs = require("fs");
const path = require("path");
const AudioRecord = require("../models/AudioRecord");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const logger = require("./logger");

exports.generateDataset = async () => {

  if (fs.existsSync("dataset")) {
    fs.rmSync("dataset", { recursive: true, force: true });
  }

  fs.mkdirSync("dataset");

  const records = await AudioRecord.find();
  const csvData = [];

  records.forEach(record => {
    const filename = path.basename(record.file_path);
    fs.copyFileSync(record.file_path, `dataset/${filename}`);

    csvData.push({
      audio_file: filename,
      transcription: record.transcription,
      device_id: record.device_id
    });
  });

  const csvWriter = createCsvWriter({
    path: "dataset/metadata.csv",
    header: [
      { id: "audio_file", title: "audio_file" },
      { id: "transcription", title: "transcription" },
      { id: "device_id", title: "device_id" }
    ]
  });

  await csvWriter.writeRecords(csvData);

  logger.info("Dataset generated successfully");
};