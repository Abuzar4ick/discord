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

    const result = await authService.signup({ email, password, username, is_verified: false });
    success(res, result);
  }),

  verifyEmail: asyncHandler(async (req: Request, res: Response) => {
    const token = req.query.token;

    if (typeof token !== "string" || !token) {
      throw badRequest("A verification token is required.");
    }

    const result = await authService.verifyEmail(res, token);
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

  refreshToken: asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken || typeof refreshToken !== "string") {
      throw badRequest("Refresh token is required.");
    }

    const result = await await authService.refreshToken(refreshToken);
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
