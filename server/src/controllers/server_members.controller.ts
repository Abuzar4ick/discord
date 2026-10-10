import type { Request, Response } from "express";
import { serverMembersService } from "../services/server_members.service.js";
import { success, badRequest } from "../utils/response.js";

export const serverMembersController = {
  async addMember(req: Request, res: Response) {
    const serverMember = req.body;

    if (!serverMember.server_id || !serverMember.user_id) {
      throw badRequest("server_id and user_id are required");
    }

    const addedMember = await serverMembersService.addMember(serverMember);
    return success(res, addedMember, 201);
  },

  async findMembersByServerId(req: Request, res: Response) {
    const server_id = req.params.server_id as unknown as number;

    const members = await serverMembersService.findMembersByServerId(server_id);
    return success(res, members);
  },
};
