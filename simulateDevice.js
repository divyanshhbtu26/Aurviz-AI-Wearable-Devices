const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function simulateDevice() {
  const form = new FormData();
  form.append("device_id", "device_101");
  form.append("transcription", "open LinkedIn");
  form.append("audio", fs.createReadStream("./uploads/1.mp3"));

  await axios.post("http://localhost:5000/api/audio/upload", form, {
    headers: form.getHeaders()
  });

  console.log("Simulated Upload Successful");
}

simulateDevice();