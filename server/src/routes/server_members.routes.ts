import { Router } from "express";
import { serverMembersController as controller } from "../controllers/server_members.controller.js"

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", controller.addMember);
router.delete("/:server_id", controller.kickOutMember);
router.get("/:server_id", controller.findMembersByServerId);

export default router;
