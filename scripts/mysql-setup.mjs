import { readFile } from "node:fs/promises";
import { database } from "../src/lib/mysql.server.ts";

const pool = database();
try {
  const schema = await readFile(new URL("../mysql/schema.sql", import.meta.url), "utf8");
  for (const statement of schema.split(";").map((sql) => sql.trim()).filter(Boolean)) {
    await pool.query(statement);
  }
  const admin = process.env.DB_ADMIN_USER_ID;
  if (admin) {
    if (!/^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(admin)) throw new Error("DB_ADMIN_USER_ID must be a Supabase Auth user UUID.");
    await pool.execute("INSERT INTO admin_users (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id = user_id", [admin]);
  }
  console.log("MySQL schema ready.");
} finally {
  await pool.end();
}
