import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler.js";

import { ENV } from "./config/env.js";

import { connectRedis } from "./config/redis.js";

const app = express();

// Connect to Redis
connectRedis();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
