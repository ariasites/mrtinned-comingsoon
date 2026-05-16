import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — MrTinned',
}

const SECTIONS = [
  {
    heading: 'What we collect',
    body: [
      'When you join the MrTinned waitlist, we collect your email address. We collect nothing else.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'Your email is used to notify you when MrTinned launches and to send the weekly newsletter once live. We do not use it for advertising, profiling, or any other purpose.',
      'Email delivery is handled by Resend (resend.com). Your address is stored on their platform in accordance with their privacy policy.',
    ],
  },
  {
    heading: 'Third-party services',
    body: [
      'MrTinned is hosted on Vercel (vercel.com). Vercel may collect anonymised request data for performance and security purposes. No other third parties have access to your data.',
    ],
  },
  {
    heading: 'Data retention',
    body: [
      'Your email address is retained until you unsubscribe or request deletion. To be removed, email hello@mrtinned.com and we will action it within 5 business days.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'MrTinned does not use tracking or advertising cookies. We do not run ad networks or cross-site tracking.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions? Email hello@mrtinned.com.',
      'MrTinned, PO Box 2941, Winnetka, CA 91396, US',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#111009',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: '64px 52px 80px',
        width: '100%',
      }}>
        <Link
          href="/"
          style={{
            display: 'block',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(217,211,196,0.35)',
            textDecoration: 'none',
            marginBottom: '48px',
          }}
        >
          ← MrTinned
        </Link>

        <h1 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '48px',
          fontWeight: 900,
          letterSpacing: '-1px',
          lineHeight: 1,
          color: '#d9d3c4',
          marginBottom: '16px',
        }}>
          Privacy Policy
        </h1>
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '13px',
          color: 'rgba(217,211,196,0.35)',
          marginBottom: '56px',
        }}>
          Effective 15 May 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {SECTIONS.map(({ heading, body }) => (
            <div key={heading}>
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(217,211,196,0.35)',
                marginBottom: '10px',
              }}>
                {heading}
              </div>
              {body.map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'rgba(217,211,196,0.55)',
                  lineHeight: 1.8,
                  margin: i > 0 ? '10px 0 0' : 0,
                }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
