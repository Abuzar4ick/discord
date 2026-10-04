import pool from "../config/db.js";
import { IServer, CreateServer } from "../types/server.js";
import { unauthorized } from "../utils/response.js";

async function isUserAvailable(id: number, owner_id: number): Promise<boolean> {
  const query =
    "SELECT * FROM servers WHERE id = $1 AND owner_id = $2 RETURNING *";

  const result = await pool.query(query, [id, owner_id]);

  return (result.rowCount ?? 0) > 0;
}

export const serversRepository = {
  async createServer(data: CreateServer, owner_id: number): Promise<IServer> {
    const query =
      "INSERT INTO servers (name, owner_id, icon) VALUES ($1, $2, $3) RETURNING *";

    const result = await pool.query(query, [data.name, owner_id, data.icon]);

    return result.rows[0];
  },

  async updateServer(
    id: number,
    name: string,
    icon: string,
    owner_id: number,
  ): Promise<IServer> {
    const isOwner = await isUserAvailable(id, owner_id);
    if (!isOwner) throw unauthorized("Only owner can update the server");

    const query =
      "UPDATE servers SET name = $1, icon = $2 WHERE id = $3 RETURNING *";
    const result = await pool.query(query, [name, icon, id]);

    return result.rows[0];
  },

  async deleteServer(id: number, owner_id: number): Promise<boolean> {
    const isOwner = await isUserAvailable(id, owner_id);
    if (!isOwner) throw unauthorized("Only owner can delete the server");

    const query = "DELETE FROM servers WHERE id = $1";
    const result = await pool.query(query, [id]);

    return (result.rowCount ?? 0) > 0;
  },
};
