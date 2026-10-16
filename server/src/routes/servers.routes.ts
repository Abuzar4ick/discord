import { Router } from "express";
import { serversController as controller } from "../controllers/servers.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", authMiddleware, controller.getServerById);
router.post("/", authMiddleware, controller.createNewserver);
router.put("/:id", authMiddleware, controller.updateServer);
router.delete("/:id", authMiddleware, controller.deleteServer);

export default router;
