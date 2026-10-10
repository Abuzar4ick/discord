import { Router } from "express";
import { serverMembersController } from "../controllers/server_members.controller.js"

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, serverMembersController.addMember);
router.get("/:server_id", authMiddleware, serverMembersController.findMembersByServerId);

export default router;
