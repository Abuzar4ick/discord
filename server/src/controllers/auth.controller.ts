import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { success, badRequest } from "../utils/response.js";

export const authController = {
  signup: asyncHandler(async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw badRequest("A valid email is required.");
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      throw badRequest("A valid password (at least 6 characters) is required.");
    }

    if (!username || typeof username !== "string") {
      throw badRequest("A valid username is required.");
    }

    const result = await authService.signup({ email, password, username });
    success(res, result);
  }),

  verifyOTP: asyncHandler(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw badRequest("A valid email is required.");
    }

    if (!otp || typeof otp !== "string" || otp.length !== 6) {
      throw badRequest("A valid 6-digit OTP is required.");
    }

    const result = await authService.verifyOTP(email, otp, res);
    success(res, result);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw badRequest("A valid email is required.");
    }

    if (!password || typeof password !== "string") {
      throw badRequest("A valid password is required.");
    }

    const result = await authService.login(email, password, res);
    success(res, result);
  }),

  logout: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw badRequest("User ID is required for logout.");
    }

    await authService.logout(userId.toString(), res);
  }),
};
