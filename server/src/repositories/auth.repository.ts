import pool from "../config/db.js";
import { redisClient } from "../config/redis.js";

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  created_at?: Date;
}

export const authRepository = {
  async findUserByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    return result.rows[0];
  },

  async createUser(email: string, password: string): Promise<User> {
    const query =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [email, password]);

    return result.rows[0];
  },

  async storeOTPCode(email: string, otp: string): Promise<void> {
    await redisClient.setEx(email, 300, otp);
  },

  async verifyOTPCode(email: string, otp: string): Promise<boolean> {
    const storedOTP = await redisClient.get(email);
    return storedOTP === otp;
  },

  async deleteOTPCode(email: string): Promise<void> {
    await redisClient.del(email);
  },

  storeRefreshToken: async (
    userId: string,
    refreshToken: string,
  ): Promise<void> => {
    await redisClient.set(userId, refreshToken, { EX: 7 * 24 * 60 * 60 });
  },

  getRefreshToken: async (userId: string): Promise<string | null> => {
    return await redisClient.get(userId);
  },

  deleteRefreshToken: async (userId: string): Promise<void> => {
    await redisClient.del(userId);
  },
};
