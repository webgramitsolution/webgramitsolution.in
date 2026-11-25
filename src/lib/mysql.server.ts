import mysql, { type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

type Value = string | number | boolean | Date | null;

let pool: ReturnType<typeof mysql.createPool> | undefined;

export function database() {
  if (pool) return pool;
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_SSL } = process.env;
  if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASSWORD) throw new Error("MySQL is not configured.");
  pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    timezone: "Z",
    charset: "utf8mb4",
    connectionLimit: 5,
    queueLimit: 30,
    ...(DB_SSL === "true" ? { ssl: { rejectUnauthorized: true } } : {}),
  });
  pool.pool.on("connection", (connection) => {
    connection.query("SET time_zone = '+00:00'");
  });
  return pool;
}

export async function readyDatabase() {
  const { initializeDatabase } = await import("./mysql-bootstrap.server");
  await initializeDatabase();
  return database();
}

export async function rows<T>(sql: string, values: Value[] = []): Promise<T[]> {
  const [result] = await (await readyDatabase()).execute<RowDataPacket[]>(sql, values);
  // mysql2 returns UTC Date objects and MariaDB can return JSON as text.
  return result.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => {
        if (value instanceof Date) return [key, value.toISOString()];
        if (["noindex", "is_active", "is_published"].includes(key)) return [key, Boolean(value)];
        if (["tags", "faqs", "preferences"].includes(key) && typeof value === "string")
          return [key, JSON.parse(value)];
        return [key, value];
      }),
    ),
  ) as T[];
}

export async function write(sql: string, values: Value[] = []) {
  const [result] = await (await readyDatabase()).execute<ResultSetHeader>(sql, values);
  return result;
}

export function saveRecord(
  table: "blog_posts" | "blog_categories" | "homepage_reviews",
  id: string,
  record: Record<string, Value>,
  edit: boolean,
) {
  // Column names come from server-defined record literals. Values always use placeholders.
  const columns = Object.keys(record);
  const values = Object.values(record);
  if (edit) {
    return write(
      `UPDATE ${table} SET ${columns.map((column) => `${column} = ?`).join(", ")} WHERE id = ?`,
      [...values, id],
    );
  }
  return write(
    `INSERT INTO ${table} (id, ${columns.join(", ")}) VALUES (?, ${columns.map(() => "?").join(", ")})`,
    [id, ...values],
  );
}

export async function isAdmin(userId: string) {
  const users = await rows<{ user_id: string }>(
    "SELECT user_id FROM admin_users WHERE user_id = ?",
    [userId],
  );
  return users.length > 0;
}
