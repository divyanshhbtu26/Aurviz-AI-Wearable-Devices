const mongoose = require("mongoose");

const audioRecordSchema = new mongoose.Schema({
  audio_id: {
    type: String,
    required: true,
    unique: true
  },
  device_id: {
    type: String,
    required: true,
    index: true
  },
  file_path: {
    type: String,
    required: true
  },
  transcription: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model("AudioRecord", audioRecordSchema);