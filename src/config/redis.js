const IORedis = require("ioredis");

const connection = new IORedis({

  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD, // add password
  maxRetriesPerRequest: null            // required for BullMQ
  
});

module.exports = { connection };