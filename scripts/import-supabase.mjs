import postgres from "postgres";
import { database } from "../src/lib/mysql.server.ts";

const source = process.env.MIGRATION_SOURCE_DATABASE_URL;
if (!source) throw new Error("Set MIGRATION_SOURCE_DATABASE_URL in the environment.");
const pg = postgres(source, { ssl: "verify-full", max: 1 });
const mysql = database();

const tables = {
  profiles: "id,display_name,avatar_url,preferences,created_at,updated_at",
  blog_categories: "id,name,slug,description,display_order,parent_id,is_active,created_at",
  blog_posts:
    "id,slug,title,excerpt,content,featured_image,featured_image_alt,category_id,subcategory_id,tags,faqs,noindex,author_id,author_name,status,seo_title,seo_description,published_at,live_notified_at,created_at,updated_at,view_count",
  blog_comments: "id,post_id,user_id,author_name,body,created_at",
  enquiries: "id,name,email,phone,service,message,status,reply_message,replied_at,created_at",
  homepage_reviews:
    "id,avatar_url,customer_name,customer_role,company_name,review_text,rating,is_published,display_order,created_at,updated_at",
  indexing_requests: "id,user_id,url,status,created_at",
  support_tickets: "id,user_id,subject,message,status,created_at",
};

function orderCategories(categories) {
  const ordered = [];
  const remaining = new Map(categories.map((row) => [row.id, row]));
  const added = new Set();
  while (remaining.size) {
    const before = remaining.size;
    for (const row of remaining.values()) {
      if (row.parent_id && !added.has(row.parent_id)) continue;
      ordered.push({ ...row, parent_scope: row.parent_id ?? "" });
      added.add(row.id);
      remaining.delete(row.id);
    }
    if (remaining.size === before)
      throw new Error("Source contains an invalid category hierarchy.");
  }
  return ordered;
}

async function insertMissing(connection, table, key, row) {
  const [existing] = await connection.execute(`SELECT ${key} FROM ${table} WHERE ${key} = ?`, [
    row[key],
  ]);
  if (existing.length) return false;
  const columns = Object.keys(row);
  const jsonColumns = new Set(["faqs", "tags", "preferences"]);
  const values = columns.map((column) =>
    jsonColumns.has(column) ? JSON.stringify(row[column]) : row[column],
  );
  await connection.execute(
    `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`,
    values,
  );
  return true;
}

const counts = [];
let connection;
try {
  connection = await mysql.getConnection();
  await connection.beginTransaction();
  await pg.begin("isolation level repeatable read read only", async (read) => {
    for (const [table, columns] of Object.entries(tables)) {
      const sourceRows = await read.unsafe(`SELECT ${columns} FROM public.${table}`);
      const records = table === "blog_categories" ? orderCategories(sourceRows) : sourceRows;
      let inserted = 0;
      for (const row of records) {
        if (await insertMissing(connection, table, "id", row)) inserted++;
      }
      counts.push([table, records.length, inserted]);
    }
    const admins = await read`SELECT DISTINCT user_id FROM public.user_roles WHERE role = 'admin'`;
    let inserted = 0;
    for (const row of admins) {
      if (await insertMissing(connection, "admin_users", "user_id", row)) inserted++;
    }
    counts.push(["admin_users", admins.length, inserted]);
  });
  await connection.commit();
  for (const [table, sourceCount, inserted] of counts) {
    console.log(`${table}: ${inserted} inserted, ${sourceCount - inserted} already present`);
  }
} catch (error) {
  await connection?.rollback();
  console.error("Import failed. MySQL changes rolled back.", error.code ?? error.name);
  process.exitCode = 1;
} finally {
  connection?.release();
  await Promise.all([pg.end(), mysql.end()]);
}
