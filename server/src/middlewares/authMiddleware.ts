/// <reference path="../types/globals.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { unauthorized } from "../utils/response.js";

interface Jwt_Payload {
  id: number;
  email: string;
}

export const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer") ? authHeader.slice(7) : null;

  if (!token) {
    return next(unauthorized("Not authenticated."));
  }

  try {
    req.user = jwt.verify(token, ENV.JWT_ACCESS_SECRET as string) as Jwt_Payload;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return next(unauthorized("Token expired or invalid"));
  }
};
