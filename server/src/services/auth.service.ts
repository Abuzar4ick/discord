import type { Response } from "express";
import { authRepository } from "../repositories/auth.repository.js";
import { generateToken } from "../utils/generateToken.js";
import { notFound, badRequest } from "../utils/response.js";
import { sendOTPMessage } from "../emails/emailHandler.js";

export const authService = {
  async signup(data: Express.User) {
    const existingUser = await authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const isUsernameTaken = await authRepository.findUserByUsername(
      data.username,
    );
    if (isUsernameTaken) {
      throw new Error("Username already taken");
    }

    await sendOTPMessage(data.email);

    await authRepository.storeVerificationData(data.email, data);

    return { message: "OTP sent to email" };
  },

  async verifyOTP(email: string, otp: string, res: Response) {
    const isValidOTP = await authRepository.verifyOTPCode(email, otp);
    if (!isValidOTP) {
      throw new Error("Invalid OTP");
    }

    const userData = await authRepository.getVerificationData(email);
    if (!userData) {
      throw new Error("User data not found");
    }

    const newUser = await authRepository.createUser(userData);

    // Clean up OTP and verification data after successful verification
    await authRepository.deleteOTPCode(email);
    await authRepository.deleteVerificationData(email);

    const accessToken = generateToken(newUser, res);
    return { accessToken };
  },

  async login(email: string, password: string, res: Response) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw notFound("User not found");
    }

    if (user.password !== password) {
      throw badRequest("Invalid password or email");
    }

    const accessToken = generateToken(user, res);
    return { accessToken };
  },

  async logout(userId: string, res: Response) {
    await authRepository.deleteRefreshToken(userId);
    res.clearCookie("refreshToken");
  }
};
