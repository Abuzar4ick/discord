import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env.js";

interface PgError extends Error {
  code?: string;
  detail?: string;
  constraint?: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

type AppErrorLike = Error & Partial<AppError> & Partial<PgError>;

export const errorHandler = (
  err: AppErrorLike,
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  switch (err.code) {
    case "23505":
      statusCode = 409;
      message = "Duplicate entry";
      break;
    case "23503":
      statusCode = 409;
      message = "Related record not found";
      break;
    case "23502":
      statusCode = 400;
      message = "Missing required field";
      break;
    case "22P02":
      statusCode = 400;
      message = "Invalid input format";
      break;
  }

  if (ENV.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(ENV.NODE_ENV === "development" && { stack: err.stack }),
  });
};
