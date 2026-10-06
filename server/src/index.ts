import express from "express";
import cors from "cors";

import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import { ENV } from "./config/env.js";

import { connectRedis } from "./config/redis.js";

const app = express();

// Connect to Redis
connectRedis();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api", routes);

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
