import { Pool } from "pg";

import { ENV } from "./env.js";

if (!ENV.DATABASE_URL) {
  console.error("DATABASE_URL is not defined in the environment variables.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;
