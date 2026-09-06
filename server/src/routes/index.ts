import { Router, Request, Response } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

export default router;
