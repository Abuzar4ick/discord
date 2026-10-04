import { Router } from "express";
import { serversController } from "../controllers/servers.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, serversController.createNewserver);
router.put("/:id", authMiddleware, serversController.updateServer);
router.delete("/:id", authMiddleware, serversController.deleteServer);

export default router;
