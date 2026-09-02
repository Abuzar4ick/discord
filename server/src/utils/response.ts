import { Response } from "express";
import { AppError } from "../middlewares/errorHandler.js";

// Success response helpers
export function success(res: Response, data: any, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

export function created(res: Response, data: any) {
  return res.status(201).json({
    success: true,
    data,
  });
}

export function deleted(res: Response, message = "Resource deleted") {
  return res.status(200).json({
    success: true,
    message,
  });
}

// Error response helpers
export function notFound(message = "Resource not found") {
  return new AppError(message, 404);
}

export function badRequest(message = "Bad request") {
  return new AppError(message, 400);
}

export function conflict(message = "Conflict") {
  return new AppError(message, 409);
}

export function unauthorized(message = "Unauthorized") {
  return new AppError(message, 401);
}

export function forbidden(message = "Forbidden") {
  return new AppError(message, 403);
}
