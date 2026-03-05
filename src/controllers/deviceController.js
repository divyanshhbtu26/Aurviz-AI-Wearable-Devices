const AudioRecord = require("../models/AudioRecord");

exports.getDeviceAudio = async (req, res, next) => {
  try {
    const { device_id } = req.params;

    const records = await AudioRecord.find({ device_id })
      .sort({ created_at: -1 });

    res.json(records);
    

  } catch (error) {
    next(error);
  }
};