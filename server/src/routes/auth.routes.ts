import { Router } from "express";
import { authController as controller } from "../controllers/auth.controller.js";

import { rateLimiter } from "../middlewares/rateLimiter.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", rateLimiter(5, 15), controller.signup);
router.get("/verify-email", rateLimiter(5, 15), controller.verifyEmail);
router.post("/verify-email", rateLimiter(5, 15), controller.verifyEmail);
router.post("/login", rateLimiter(10, 10), controller.login);
router.post("/refresh-token", authMiddleware, rateLimiter(3, 10), controller.refreshToken);
router.post("/logout", authMiddleware, rateLimiter(5, 15), controller.logout);

export default router;
