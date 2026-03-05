# Aurviz-AI-Wearable-Devices
# Aurviz Backend Assignment

## Overview

This project implements a backend system that collects and manages audio data sent from simulated wearable devices. Each device uploads an audio file along with its **device ID and transcription**. The backend stores the audio file, saves metadata in MongoDB, and provides APIs to retrieve device audio records and generate a dataset containing audio files and metadata.

The system also simulates how real IoT/AI wearable devices send voice command data to a backend server.

---

## Technologies Used

* **Node.js & Express.js** – Backend server and API handling
* **MongoDB (Mongoose)** – Database for storing device and audio metadata
* **Redis + BullMQ** – Queue system for dataset generation jobs
* **Multer** – Middleware for handling audio file uploads
* **Archiver** – Used to generate a downloadable dataset ZIP file
* **UUID** – Generates unique audio IDs
* **Winston Logger** – Logging system for tracking server activity

---

## Features Implemented

### 1. Audio Upload System

Devices upload:

* audio file
* device ID
* transcription

The server:

* saves the audio file in the `uploads/` folder
* generates a unique `audio_id`
* stores metadata in MongoDB
* logs the upload activity

---

### 2. Device Audio Retrieval

The backend provides an endpoint to retrieve all audio records uploaded by a specific device.

Each record contains:

* audio_id
* device_id
* transcription
* file_path
* created_at timestamp

---

### 3. Dataset Generation

The system generates a dataset consisting of audio files and metadata.

Structure:

```
dataset/
   audio_1.wav
   audio_2.wav
   metadata.csv
```

The `metadata.csv` file contains:

```
audio_file,transcription,device_id
audio_1.wav,open camera,device_101
audio_2.wav,read this text,device_203
```

The dataset can be downloaded using an API endpoint which returns a **ZIP file**.

---

### 4. Redis Queue Processing

Dataset generation is handled through a **Redis queue using BullMQ** to simulate background processing tasks. This design ensures that large dataset generation tasks do not block the main server thread.

---

### 5. Device Simulation

Since real hardware devices are not available, a script `simulateDevice.js` is included to simulate device behavior.

The script automatically sends audio data to the backend API, mimicking how real wearable devices would upload voice recordings.

---

### 6. Input Validation

Basic validation ensures required fields are present in requests such as:

* device_id
* transcription
* audio file

---

### 7. Error Handling

Centralized error middleware is used to handle and return consistent API error responses.

---

### 8. Logging

Server activities such as uploads and errors are logged using a logging utility.

---

## Project Structure

```
src
 ├── config
 │   ├── db.js
 │   └── redis.js
 │
 ├── models
 │   ├── Device.js
 │   └── AudioRecord.js
 │
 ├── controllers
 │   ├── audioController.js
 │   ├── deviceController.js
 │   └── datasetController.js
 │
 ├── routes
 │   ├── audioRoutes.js
 │   ├── deviceRoutes.js
 │   └── datasetRoutes.js
 │
 ├── middlewares
 │   ├── uploadMiddleware.js
 │   └── errorMiddleware.js
 │
 ├── queues
 │   ├── datasetQueue.js
 │   └── datasetWorker.js
 │
 ├── utils
 │   ├── logger.js
 │   ├── csvGenerator.js
 │   └── fileUtils.js
 │
 └── app.js

uploads/          (stored audio files)
dataset/          (generated dataset)
simulateDevice.js (device simulator)
.env
package.json
README.md
```

---

## API Endpoints

### Upload Audio

```
POST /api/audio/upload
```

Request type: `multipart/form-data`

Parameters:

* device_id
* transcription
* audio file

Example Response:

```
{
 "status": "success",
 "audio_id": "generated_uuid"
}
```

---

### Get Device Audio

```
GET /api/device/:device_id/audio
```

Returns all audio records for the given device.

Example:

```
GET /api/device/device_1/audio
```

---

### Download Dataset

```
GET /api/dataset/download
```

Returns:

```
dataset.zip
```

Containing audio files and `metadata.csv`.

---

## Setup Instructions

### 1. Clone Repository

```
git clone <repo-url>
cd aurviz-backend-assignment
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Create `.env` file

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/aurviz
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

### 4. Start MongoDB

Ensure MongoDB is running locally or use MongoDB Atlas.

---

### 5. Start Redis

Redis must be running for queue processing.

---

### 6. Run Server

```
npm run dev
```

or

```
node src/app.js
```

Server runs on:

```
http://localhost:5000
```

---

## Testing APIs

Use **Postman** to test the APIs.

Example upload request:

```
POST http://localhost:5000/api/audio/upload
```

Form-data:

```
device_id = device_1
transcription = hello world
audio = upload mp3/wav file
```

---

## Device Simulation

To simulate a device sending audio data:

```
node simulateDevice.js
```

The script sends audio files and metadata to the upload API automatically.

---

## Dataset Generation

Dataset can be downloaded using:

```
GET /api/dataset/download
```

The response is a **ZIP file** containing audio files and metadata.
