import type { Response } from "express";
import { authRepository as repository } from "../repositories/auth.repository.js";
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
  async signup(data: CreateUser): Promise<{ message: string }> {
    const existingUser = await repository.findUserByEmail(data.email);
    if (existingUser) {
      throw conflict("User already exists");
    }

    const isUsernameTaken = await repository.findUserByUsername(
      data.username,
    );
    if (isUsernameTaken) {
      throw conflict("Username already taken");
    }

    await sendVerificationMessage(data.email);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    await repository.storeVerificationData(data.email, data);

    return { message: "Verification email sent" };
  },

  async verifyEmail(res: Response, token: string): Promise<{ accessToken: string }> {
    const email = await repository.consumeEmailVerificationToken(token);
    if (!email) {
      throw unauthorized("Invalid or expired verification token.");
    }

    const userData = await repository.getVerificationData(email);
    if (!userData) {
      throw badRequest("Verification data expired or not found");
    }

    const newUser = await repository.createUser(userData);

    await repository.markUserAsVerified(newUser.id);

    // Clean up token and verification data after successful verification
    await repository.deleteVerificationData(email);

    const accessToken = await generateToken(newUser, res);
    return { accessToken };
  },

  async login(email: string, password: string, res: Response): Promise<{ accessToken: string }> {
    const user = await repository.findUserByEmail(email);
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

    const stored = await repository.getRefreshToken(payload.id);
    if (!stored || stored !== refreshToken) {
      throw unauthorized("Refresh token not found.");
    }

    const existingUser = await repository.findUserById(payload.id);
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

  async logout(userId: string, res: Response): Promise<void> {
    await repository.deleteRefreshToken(userId);
    res.clearCookie("refreshToken");
  },
};
