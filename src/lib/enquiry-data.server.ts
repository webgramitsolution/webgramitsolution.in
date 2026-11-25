import { createHash, randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { readyDatabase } from "./mysql.server";

export async function createEnquiry(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const email = data.email.toLowerCase();
  const lock = createHash("sha256").update(`webgram:enquiry:${email}`).digest("hex");
  const connection = await (await readyDatabase()).getConnection();
  let locked = false;
  try {
    const [result] = await connection.execute<RowDataPacket[]>(
      "SELECT GET_LOCK(?, 5) AS acquired",
      [lock],
    );
    locked = result[0]?.["acquired"] === 1;
    if (!locked) throw new Error("Please try again in a moment.");

    const [recent] = await connection.execute<RowDataPacket[]>(
      "SELECT id FROM enquiries WHERE email = ? AND created_at > UTC_TIMESTAMP(3) - INTERVAL 10 MINUTE LIMIT 3",
      [email],
    );
    if (recent.length >= 3)
      throw new Error("Too many enquiries. Please try again in a few minutes.");

    const id = randomUUID();
    await connection.execute(
      "INSERT INTO enquiries (id,name,email,phone,service,message,created_at) VALUES (?,?,?,?,?,?,UTC_TIMESTAMP(3))",
      [id, data.name, email, data.phone, data.service, data.message],
    );
    return id;
  } finally {
    if (locked) {
      try {
        await connection.execute("SELECT RELEASE_LOCK(?)", [lock]);
      } catch {
        connection.destroy();
      }
    }
    connection.release();
  }
}
