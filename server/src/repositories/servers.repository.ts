import pool from "../config/db.js";
import { redisClient } from "../config/redis.js";
import { IServer, CreateServer } from "../types/server.js";

export const serversRepository = {
  async createServer(data: CreateServer, owner_id: number): Promise<IServer> {
    const query =
      "INSERT INTO servers (name, owner_id, icon) VALUES ($1, $2, $3) RETURNING *";

    const result = await pool.query(query, [data.name, owner_id, data.icon]);

    return result.rows[0];
  },

  async updateServer(id: number, name: string): Promise<IServer> {
    const query = "UPDATE servers SET name = 1$ WHERE id = $2 RETURNING *";
    const result = await pool.query(query, [name, id]);

    return result.rows[0];
  },

  async deleteServer(id: number): Promise<boolean> {
    const query = "DELETE * FROM servers WHERE id = $1";
    const result = await pool.query(query, [id]);

    return (result.rowCount ?? 0) > 0;
  },
};
