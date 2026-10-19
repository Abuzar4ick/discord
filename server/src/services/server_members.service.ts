import { serverMembersRepo as repository } from "../repositories/server_members.repository.js";
import { IServerMember } from "../types/server.js";
import { badRequest } from "../utils/response.js";

export const serverMembersService = {
  async addMember(serverMember: IServerMember) {
    const existingMember = await repository.existingMember(
      serverMember.server_id,
      serverMember.user_id,
    );

    if (existingMember) {
      throw badRequest("User is already a member of this server");
    }

    const addedMember = await repository.addMember(serverMember);
    return addedMember;
  },

  async kickOutMember(server_id: number, member_id: number): Promise<boolean> {
    const deletedMember = await repository.deleteMember(server_id, member_id);
    if (!deletedMember) throw badRequest("Failed to delete server_member from server");

    return deletedMember;
  },

  async findMembersByServerId(server_id: number) {
    const members = await repository.findByServerId(server_id);
    return members;
  },
};
