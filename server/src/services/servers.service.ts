import { serversRepository } from "../repositories/servers.repository.js";
import { IServer, CreateServer } from "../types/server.js";
import { badRequest } from "../utils/response.js";

export const serversServer = {
  async createNewServer(data: CreateServer, userId: number): Promise<IServer> {
    const newServer = await serversRepository.createServer(data, userId);
    if (!newServer) throw badRequest("Failed to create new server");

    return newServer;
  },

  async updateServer(
    data: { name: string; icon: string },
    id: number,
    userid: number,
  ): Promise<IServer> {
    const updatedServer = await serversRepository.updateServer(
      id,
      data.name,
      data.icon,
      userid,
    );
    if (!updatedServer) throw badRequest("Failed to update server");

    return updatedServer;
  },

  async deleteServer(id: number, userid: number): Promise<boolean> {
    const deletedServer = await serversRepository.deleteServer(id, userid);
    if (!deletedServer) throw badRequest("Failed to delete server");

    return deletedServer;
  },
};
