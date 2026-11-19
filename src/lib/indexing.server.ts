// Server-only: Google Indexing API + IndexNow (Bing, Yandex, etc.)
export const INDEXNOW_KEY = "d7a3e7929ac933440e62cdab156a6a30";
const HOST = "webgramitsolution.in";

function b64url(input: ArrayBuffer | string) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function googleToken() {
  const raw = process.env["GOOGLE_INDEXING_SA_JSON"];
  if (!raw) throw new Error("Google indexing key is not configured.");
  const sa = JSON.parse(raw) as { client_email: string; private_key: string };
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/indexing", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const pem = sa.private_key.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${claim}`));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${header}.${claim}.${b64url(sig)}` }),
  });
  const json = (await res.json()) as { access_token?: string; error_description?: string };
  if (!json.access_token) throw new Error(`Google auth failed: ${json.error_description ?? res.status}`);
  return json.access_token;
}

export async function submitGoogle(urls: string[]) {
  const token = await googleToken();
  const results: { url: string; ok: boolean; status: number; message: string }[] = [];
  for (const url of urls) {
    const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    });
    const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    results.push({ url, ok: res.ok, status: res.status, message: body.error?.message ?? "" });
  }
  return results;
}

export async function submitIndexNow(urls: string[]) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList: urls }),
  });
  return { ok: res.status === 200 || res.status === 202, status: res.status };
}

export function isOwnUrl(u: string) {
  try { const p = new URL(u); return p.protocol === "https:" && p.hostname === HOST; } catch { return false; }
}
