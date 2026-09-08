import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

import { rateLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/signup", rateLimiter(5, 15), authController.signup);
router.post("/verify-otp", rateLimiter(5, 15), authController.verifyOTP);
router.post("/login", rateLimiter(10, 10), authController.login);
router.post("/logout", rateLimiter(5, 15), authController.logout);

export default router;
