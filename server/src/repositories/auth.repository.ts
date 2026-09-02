import pool from "../config/db.js";

export const authRepository = {
  async findUserByEmail(email: string) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    return result.rows[0];
  },

  async createUser(email: string, password: string) {
    const query =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [email, password]);

    return result.rows[0];
  },
};
