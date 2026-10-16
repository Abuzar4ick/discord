import { Router } from "express";
import { serverMembersController as controller } from "../controllers/server_members.controller.js"

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, controller.addMember);
router.get("/:server_id", authMiddleware, controller.findMembersByServerId);

export default router;
