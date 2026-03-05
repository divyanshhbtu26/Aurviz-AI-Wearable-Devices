const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
require("./queues/datasetWorker");

const audioRoutes = require("./routes/audioRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const datasetRoutes = require("./routes/datasetRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

connectDB();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/audio", audioRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/dataset", datasetRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});