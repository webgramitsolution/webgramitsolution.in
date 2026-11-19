import { SITE_URL } from "./site-identity";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  business: string;
  budget: string;
  timeline: string;
};

export async function forwardEnquiry(enquiry: Enquiry) {
  const endpoint = process.env["ENQUIRY_CRM_WEBHOOK_URL"];
  if (!endpoint) return;
  const url = new URL(endpoint);
  if (url.protocol !== "https:") throw new Error("CRM webhook requires HTTPS.");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": enquiry.id },
    body: JSON.stringify({
      event: "webgram.enquiry.created",
      ...enquiry,
      country: "IN",
      site: SITE_URL,
    }),
    redirect: "error",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`CRM webhook returned HTTP ${response.status}.`);
}
