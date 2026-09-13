import type { Response } from "express";
import { authRepository } from "../repositories/auth.repository.js";
import { generateToken } from "../utils/generateToken.js";
import {
  notFound,
  badRequest,
  unauthorized,
  conflict,
} from "../utils/response.js";
import { sendVerificationMessage } from "../emails/emailHandler.js";
import { CreateUser } from "../types/user.js";
import { ENV } from "../config/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    await sendVerificationMessage(data.email);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    await authRepository.storeVerificationData(data.email, data);

    return { message: "Verification email sent" };
  },

  async verifyEmail(res: Response, token: string) {
    const email = await authRepository.consumeEmailVerificationToken(token);
    if (!email) {
      throw unauthorized("Invalid or expired verification token.");
    }

    const userData = await authRepository.getVerificationData(email);
    if (!userData) {
      throw badRequest("Verification data expired or not found");
    }

    const newUser = await authRepository.createUser(userData);

    // Clean up token and verification data after successful verification
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

  async refreshToken(refreshToken: string) {
    let payload: { id?: string };

    try {
      payload = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET as string) as {
        id?: string;
      };
    } catch (error) {
      throw unauthorized("Invalid refresh token.");
    }

    if (!payload.id) {
      throw unauthorized("Invalid refresh token payload.");
    }

    const stored = await authRepository.getRefreshToken(payload.id);
    if (!stored || stored !== refreshToken) {
      throw unauthorized("Refresh token not found.");
    }

    const existingUser = await authRepository.findUserById(payload.id);
    if (!existingUser) {
      throw unauthorized("User not found.");
    }

    const newAccessToken = jwt.sign(
      { id: payload.id },
      ENV.JWT_ACCESS_SECRET!,
      {
        expiresIn: "15m",
      },
    );

    return { newAccessToken }
  },

  async logout(userId: string, res: Response) {
    await authRepository.deleteRefreshToken(userId);
    res.clearCookie("refreshToken");
  },
};
