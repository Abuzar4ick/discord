import { rateLimit } from "express-rate-limit";

export const rateLimiter = (limit: number, minutes: number) => rateLimit({
  windowMs: minutes * 60 * 1000, // specified minutes
  limit: limit,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: `Too many requests from this IP, please try again after ${minutes} minutes`,
});
