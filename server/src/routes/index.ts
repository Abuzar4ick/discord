import { Router, Request, Response } from "express";
import authRoutes from "./auth.routes.js";
import serversRoutes from "./servers.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/servers", serversRoutes);

router.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

export default router;
