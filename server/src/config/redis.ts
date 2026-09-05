import { createClient, type RedisClientType } from "redis";
import { ENV } from "./env.js";

export const redisClient: RedisClientType = createClient({
  url: ENV.REDIS_URL,
});

export async function connectRedis(): Promise<void> {
  await redisClient.connect();
  console.log("Successfully connected to Redis");
}

// Error handling
redisClient.on("error", (err: Error) => {
  console.error("Redis error:", err);
  process.exit(1); // Exit the process if Redis connection fails
});
