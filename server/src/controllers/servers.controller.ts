import type { Request, Response } from "express";
import { serversServer } from "../services/servers.service.js";
import { IServer, CreateServer } from "../types/server.js";
import asyncHandler from "../utils/asyncHandler.js";
import { success, badRequest } from "../utils/response.js";

export const serversController = {
  createNewserver: asyncHandler(async (req: Request, res: Response) => {
    const data: CreateServer = req.body;
    const userId: number = req.user?.id as number;

    if (!data.name) throw badRequest("Server name is required");

    const newServer: IServer = await serversServer.createNewServer(
      data,
      userId,
    );
    if (!newServer) throw badRequest("Failed to create new server");

    success(res, newServer);
  }),

  updateServer: asyncHandler(async (req: Request, res: Response) => {
    const serverId: number = req.params.id as unknown as number;
    const { name, icon }: { name: string; icon: string } = req.body;
    const userId: number = req.user?.id as number;

    if (!name && !icon) {
      throw badRequest(
        "At least one field (name or icon) is required for update",
      );
    }

    const updatedServer: IServer = await serversServer.updateServer(
      { name, icon },
      serverId,
      userId,
    );
    if (!updatedServer) throw badRequest("Failed to update server");

    success(res, updatedServer);
  }),

  deleteServer: asyncHandler(async (req: Request, res: Response) => {
    const serverId: number = req.params.id as unknown as number;
    const userId: number = req.user?.id as number;

    const deletedServer: boolean = await serversServer.deleteServer(
      serverId,
      userId,
    );
    if (!deletedServer) throw badRequest("Failed to delete server");

    success(res, { message: "Server deleted successfully" });
  }),
};
