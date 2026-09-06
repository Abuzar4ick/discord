import type { Response } from "express";
import { authRepository } from "../repositories/auth.repository.js";
import { generateToken } from "../utils/generateToken.js";
import {
  notFound,
  badRequest,
  unauthorized,
  conflict,
} from "../utils/response.js";
import { sendOTPMessage } from "../emails/emailHandler.js";
import { CreateUser } from "../types/user.js";
import bcrypt from "bcrypt";

export const authService = {
  async signup(data: CreateUser) {
    const existingUser = await authRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw conflict("User already exists");
    }

    const isUsernameTaken = await authRepository.findUserByUsername(
      data.username,
    );
    if (isUsernameTaken) {
      throw conflict("Username already taken");
    }

    await sendOTPMessage(data.email);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    await authRepository.storeVerificationData(data.email, data);

    return { message: "OTP sent to email" };
  },

  async verifyOTP(email: string, otp: string, res: Response) {
    const isValidOTP = await authRepository.verifyOTPCode(email, otp);
    if (!isValidOTP) {
      throw unauthorized("Invalid OTP");
    }

    const userData = await authRepository.getVerificationData(email);
    if (!userData) {
      throw badRequest("Verification data expired or not found");
    }

    const newUser = await authRepository.createUser(userData);

    // Clean up OTP and verification data after successful verification
    await authRepository.deleteOTPCode(email);
    await authRepository.deleteVerificationData(email);

    const accessToken = await generateToken(newUser, res);
    return { accessToken };
  },

  async login(email: string, password: string, res: Response) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw notFound("User not found");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw unauthorized("Invalid password or email");
    }

    const accessToken = await generateToken(user, res);
    return { accessToken };
  },

  async logout(userId: string, res: Response) {
    await authRepository.deleteRefreshToken(userId);
    res.clearCookie("refreshToken");
  },
};
