import * as React from "react";
import { Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import { SITE_URL } from "../site-identity";
import type { TemplateEntry } from "./registry";

function EnquiryAcknowledgement({ name, service }: { name?: string; service?: string }) {
  return (
    <Html lang="en-IN" dir="ltr">
      <Head />
      <Preview>Your project enquiry is with the Webgram team in Delhi NCR.</Preview>
      <Body style={{ backgroundColor: "#eef3f9", fontFamily: "Arial, sans-serif", margin: 0, padding: "24px 12px" }}>
        <Container style={{ backgroundColor: "#ffffff", border: "1px solid #dbe5ef", borderRadius: "12px", margin: "0 auto", maxWidth: "560px", overflow: "hidden" }}>
          <Section style={{ backgroundColor: "#0b1f3a", borderTop: "5px solid #f4c657", padding: "28px 30px" }}>
            <Text style={{ color: "#f4c657", fontSize: "13px", fontWeight: "bold", margin: "0 0 12px" }}>WEBGRAM IT SOLUTION</Text>
            <Heading as="h1" style={{ color: "#ffffff", fontSize: "28px", lineHeight: "1.2", margin: 0 }}>We received your enquiry</Heading>
          </Section>
          <Section style={{ padding: "24px 30px 30px", color: "#334155" }}>
            <Text style={paragraph}>Hi {name || "there"},</Text>
            <Text style={paragraph}>
              Thanks for reaching out{service ? ` about ${service}` : ""}. We’ll review your requirements and email you to discuss the scope, timing and next steps.
            </Text>
            <Text style={paragraph}>If you have a reference site or more details to share, just reply to this email.</Text>
            <Button href={`${SITE_URL}/work/portfolio`} style={{ backgroundColor: "#f4c657", color: "#0b1f3a", borderRadius: "6px", fontSize: "14px", fontWeight: "bold", padding: "12px 18px" }}>
              View our work
            </Button>
            <Hr style={{ borderColor: "#e2e8f0", margin: "24px 0 16px" }} />
            <Text style={{ color: "#475569", fontSize: "12px", margin: 0 }}>
              Webgram IT Solution · New Delhi, India · <Link href={SITE_URL}>webgramitsolution.in</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const paragraph = { fontSize: "15px", lineHeight: "1.65", margin: "0 0 14px" };
export const template = {
  component: EnquiryAcknowledgement,
  subject: "We received your project enquiry | Webgram IT Solution",
  displayName: "Enquiry acknowledgement",
  previewData: { name: "Rahul", service: "Ecommerce Development" },
} satisfies TemplateEntry;
