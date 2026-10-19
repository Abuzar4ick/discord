import type { Request, Response } from "express";
import { serverMembersService as service } from "../services/server_members.service.js";
import { success, badRequest } from "../utils/response.js";

export const serverMembersController = {
  async addMember(req: Request, res: Response) {
    const serverMember = req.body;

    if (!serverMember.server_id || !serverMember.user_id) {
      throw badRequest("server_id and user_id are required");
    }

    const addedMember = await service.addMember(serverMember);
    return success(res, addedMember, 201);
  },

  async kickOutMember(req: Request, res: Response) {
    const server_id = req.params.server_id as unknown as number;
    const member_id = req.body as number;

    if (!server_id || !member_id) {
      throw badRequest("server_id and user_id are required");
    }

    const result = await service.kickOutMember(server_id, member_id);
    success(res, result);
  },

  async findMembersByServerId(req: Request, res: Response) {
    const server_id = req.params.server_id as unknown as number;

    if (!server_id) {
      throw badRequest("server_id is required");
    }

    const members = await service.findMembersByServerId(server_id);
    return success(res, members);
  },
};
