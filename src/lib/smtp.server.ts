import nodemailer from "nodemailer";

type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

function smtpConfig() {
  const host = process.env["SMTP_HOST"];
  const portValue = process.env["SMTP_PORT"];
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASSWORD"];
  const fromEmail = process.env["SMTP_FROM_EMAIL"];
  if (!host || !portValue || !user || !pass || !fromEmail) {
    throw new Error("Hostinger SMTP is not fully configured.");
  }
  const port = Number(portValue);
  if (!Number.isInteger(port) || port <= 0) throw new Error("SMTP port is invalid.");
  return { host, port, user, pass, fromEmail };
}

export async function sendSmtpMail(mail: Mail) {
  const config = smtpConfig();
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
  });

  await transport.sendMail({
    from: `Webgram IT Solution <${config.fromEmail}>`,
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
  });
}