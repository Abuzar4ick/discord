import jwt from "jsonwebtoken";
import type { Response } from "express";
import { ENV } from "../config/env.js";
import { authRepository } from "../repositories/auth.repository.js";

// Generate a JWT token for a user
export const generateToken = (
  user: { id: number; email: string },
  res: Response,
) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    ENV.JWT_ACCESS_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    ENV.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return accessToken;
};
