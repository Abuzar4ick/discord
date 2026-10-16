import { serversRepository as repository } from "../repositories/servers.repository.js";
import { IServer, CreateServer } from "../types/server.js";
import { badRequest, notFound, unauthorized } from "../utils/response.js";
import cloudinary from "../config/cloudinary.js";

async function isUserAvailable(
  serverId: number,
  owner_id: number,
): Promise<boolean> {
  const result = await repository.isUserAvailable(serverId, owner_id);
  return result;
}

export const serversService = {
  async getServerById(id: number): Promise<IServer> {
    const serverData = await repository.getServerById(id);
    if (!serverData) throw notFound("Server not found");

    return serverData;
  },

  async createNewServer(data: CreateServer, userId: number): Promise<IServer> {
    if (data.icon) {
      const uploadResult = await cloudinary.uploader.upload(data.icon, {
        folder: "servers",
      });
      data.icon = uploadResult.secure_url;
    }

    const newServer = await repository.createServer(data, userId);
    if (!newServer) throw badRequest("Failed to create new server");

    return newServer;
  },

  async updateServer(
    data: { name: string; icon: string },
    id: number,
    userId: number,
  ): Promise<IServer> {
    const existingServer = await repository.getServerById(id);
    if (!existingServer) throw notFound("Server not found");

    const isOwner = await isUserAvailable(id, userId);
    if (!isOwner) throw unauthorized("Only owner can update the server");

    if (existingServer.icon !== data.icon) {
      const uploadResult = await cloudinary.uploader.upload(data.icon, {
        folder: "servers",
      });
      data.icon = uploadResult.secure_url;
    }

    const updatedServer = await repository.updateServer(
      id,
      data.name,
      data.icon,
    );
    if (!updatedServer) throw badRequest("Failed to update server");

    return updatedServer;
  },

  async deleteServer(id: number, userId: number): Promise<boolean> {
    const isOwner = await isUserAvailable(id, userId);
    if (!isOwner) throw unauthorized("Only owner can update the server");

    const deletedServer = await repository.deleteServer(id);
    if (!deletedServer) throw badRequest("Failed to delete server");

    return deletedServer;
  },
};
