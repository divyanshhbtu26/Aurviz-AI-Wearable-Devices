const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  device_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  device_model: {
    type: String,
    default: "AI-Wearable-Model-xyz"
  },
  registered_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Device", deviceSchema);