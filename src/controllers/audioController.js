const { v4: uuidv4 } = require("uuid");
const Device = require("../models/Device");
const AudioRecord = require("../models/AudioRecord");
const logger = require("../utils/logger");

exports.uploadAudio = async (req, res, next) => {
  try {
    const { device_id, transcription } = req.body;
    const file = req.file;

    const audio_id = uuidv4();

    await Device.findOneAndUpdate(
      { device_id },
      { device_id },
      { upsert: true }
    );

    await AudioRecord.create({
      audio_id,
      device_id,
      file_path: file.path,
      transcription
    });

    logger.info(`Audio uploaded: ${audio_id}`);

    res.json({ status: "success", audio_id });

  } catch (error) {
    next(error);
  }
};