import pool from "../config/db.js";
import { redisClient } from "../config/redis.js";
import { CreateUser } from "../types/user.js";

export const authRepository = {
  async findUserByEmail(email: string): Promise<Express.User | null> {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    return result.rows[0];
  },

  async findUserByUsername(username: string): Promise<Express.User | null> {
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);

    return result.rows[0];
  },

  async createUser(data: CreateUser): Promise<Express.User> {
    const query =
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *";

    const result = await pool.query(query, [
      data.email,
      data.password,
      data.username,
    ]);

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

  storeVerificationData: async (
    email: string,
    data: CreateUser,
  ): Promise<void> => {
    await redisClient.setEx(`user:${email}`, 300, JSON.stringify(data));
  },

  getVerificationData: async (email: string): Promise<Express.User | null> => {
    const data = await redisClient.get(`user:${email}`);
    return data ? JSON.parse(data) : null;
  },

  deleteVerificationData: async (email: string): Promise<void> => {
    await redisClient.del(`user:${email}`);
  },
};
