import pool from "../config/db.js";
import { IServerMember } from "../types/server.js";

export const serverMembersRepo = {
  async existingMember(server_id: number, user_id: number): Promise<boolean> {
    const result = await pool.query(
      `SELECT * FROM server_members WHERE server_id = $1 AND user_id = $2`,
      [server_id, user_id],
    );

    return result.rows.length > 0;
  },

  async addMember(serverMember: IServerMember): Promise<IServerMember> {
    const { server_id, user_id } = serverMember;

    const result = await pool.query(
      `INSERT INTO server_members (server_id, user_id) VALUES ($1, $2) RETURNING *`,
      [server_id, user_id],
    );

    return result.rows[0];
  },

  async findByServerId(server_id: number): Promise<IServerMember[]> {
    const membersId = await pool.query(
      `SELECT * FROM server_members WHERE server_id = $1`,
      [server_id],
    );

    const result = await pool.query(`SELECT * FROM users WHERE id = ANY($1)`, [
      membersId.rows.map((member) => member.user_id),
    ]);

    return result.rows;
  },
};
