import schema from "../../mysql/schema.sql?raw";
import { database } from "./mysql.server";

let initialized: Promise<void> | undefined;

export function initializeDatabase() {
  initialized ??= applySchema().catch((error) => {
    initialized = undefined;
    throw error;
  });
  return initialized;
}

async function applySchema() {
  const pool = database();
  for (const statement of schema
    .split(";")
    .map((sql) => sql.trim())
    .filter(Boolean)) {
    await pool.query(statement);
  }
  const admin = process.env["DB_ADMIN_USER_ID"];
  if (admin) {
    if (!/^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(admin))
      throw new Error("Invalid admin user UUID.");
    await pool.execute(
      "INSERT INTO admin_users (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = user_id",
      [admin],
    );
  }
}
