import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).default(""),
  service: z.string().trim().max(80).default(""),
  message: z.string().trim().min(5).max(3000),
  business: z.string().trim().max(120).default(""),
  budget: z.string().trim().max(60).default(""),
  timeline: z.string().trim().max(60).default(""),
  website: z.string().max(0).optional(), // honeypot
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    // Public client + validated security-definer RPC: works on any host without the private key.
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"] ?? import.meta.env["VITE_SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
    const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const projectDetails = [
      data.business && `Business: ${data.business}`,
      data.budget && `Budget: ${data.budget}`,
      data.timeline && `Target launch: ${data.timeline}`,
    ].filter(Boolean);
    const message = [data.message, ...projectDetails].join("\n");
    if (message.length > 3000) throw new Error("Please shorten your project description.");
    const { data: id, error } = await client.rpc("submit_enquiry", {
      _name: data.name, _email: data.email, _phone: data.phone, _service: data.service, _message: message,
    });
    if (error || !id) throw new Error("Enquiry could not be saved. Please try again.");

    const inbox = process.env["ENQUIRY_INBOX"] || "info@webgramitsolution.com";
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    const deliveries = [
      ["team email", sendTemplateEmail("new-enquiry", inbox, {
        templateData: { name: data.name, email: data.email, phone: data.phone, service: data.service, message },
        replyTo: data.email,
      })],
      ["acknowledgement", sendTemplateEmail("enquiry-acknowledgement", data.email, {
        templateData: { name: data.name, service: data.service },
        replyTo: inbox,
      })],
    ] as const;
    const { forwardEnquiry } = await import("./enquiry-crm.server");
    const results = await Promise.allSettled([
      ...deliveries.map(([, task]) => task),
      forwardEnquiry({ id: String(id), name: data.name, email: data.email, phone: data.phone,
        service: data.service, message: data.message, business: data.business, budget: data.budget, timeline: data.timeline }),
    ]);
    results.forEach((result, index) => {
      if (result.status === "rejected") console.error("Enquiry delivery failed", { id, channel: deliveries[index]?.[0] ?? "CRM" });
    });
    return { ok: true };
  });

export const replyToEnquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid(), message: z.string().trim().min(5).max(5000) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Administrator access required.");
    const { data: enquiry, error } = await context.supabase.from("enquiries").select("id,name,email,service").eq("id", data.id).single();
    if (error || !enquiry) throw new Error("Enquiry not found.");
    const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
    const { sendSmtpMail } = await import("./smtp.server");
    await sendSmtpMail({
      to: enquiry.email,
      subject: `Re: Your Webgram enquiry — ${enquiry.service || "Project"}`,
      text: `Hi ${enquiry.name},\n\n${data.message}\n\nWebgram IT Solution\ninfo@webgramitsolution.com`,
      html: `<p>Hi ${esc(enquiry.name)},</p><p style="white-space:pre-line">${esc(data.message)}</p><p>Webgram IT Solution<br/>info@webgramitsolution.com</p>`,
      replyTo: "info@webgramitsolution.com",
    });
    const { error: upErr } = await context.supabase.from("enquiries").update({ reply_message: data.message, replied_at: new Date().toISOString(), status: "contacted" }).eq("id", data.id);
    if (upErr) throw new Error("Reply sent, but could not be saved.");
    return { ok: true };
  });
