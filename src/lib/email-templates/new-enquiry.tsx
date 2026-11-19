import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props { name?: string; email?: string; phone?: string; service?: string; message?: string }

const NewEnquiryEmail = ({ name, email, phone, service, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New website enquiry from {name ?? 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New website enquiry</Heading>
        <Section style={box}>
          <Text style={row}><strong>Name:</strong> {name ?? '-'}</Text>
          <Text style={row}><strong>Email:</strong> {email ?? '-'}</Text>
          <Text style={row}><strong>Phone:</strong> {phone || '-'}</Text>
          <Text style={row}><strong>Service:</strong> {service || '-'}</Text>
        </Section>
        <Text style={label}>Message</Text>
        <Text style={text}>{message ?? ''}</Text>
        <Text style={footer}>Reply directly to this email to respond to the visitor. — Webgram IT Solution</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewEnquiryEmail,
  subject: (d: Record<string, any>) => `New enquiry from ${d['name'] ?? 'website visitor'}`,
  displayName: 'New enquiry (admin)',
  previewData: { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', service: 'WooCommerce', message: 'I need an online store for my business.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Manrope, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#0b1f3a', margin: '0 0 18px' }
const box = { backgroundColor: '#f1f6fc', borderRadius: '8px', padding: '12px 16px' }
const row = { fontSize: '14px', color: '#0b1f3a', margin: '4px 0' }
const label = { fontSize: '12px', fontWeight: 'bold' as const, color: '#55575d', margin: '20px 0 4px', textTransform: 'uppercase' as const }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', whiteSpace: 'pre-line' as const, margin: 0 }
const footer = { fontSize: '12px', color: '#999999', margin: '28px 0 0' }
