// Server-only: IndexNow for participating search engines.
export const INDEXNOW_KEY = "d7a3e7929ac933440e62cdab156a6a30";
const HOST = "webgramitsolution.in";

export async function submitIndexNow(urls: string[]) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList: urls }),
  });
  return { ok: res.status === 200 || res.status === 202, status: res.status };
}

export function isOwnUrl(u: string) {
  try { const p = new URL(u); return p.origin === `https://${HOST}` && !p.username && !p.password; } catch { return false; }
}
