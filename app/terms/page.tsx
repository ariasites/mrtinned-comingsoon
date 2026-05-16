import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — MrTinned',
}

const SECTIONS = [
  {
    heading: 'Acceptance',
    body: [
      'By accessing MrTinned, you agree to these terms. If you do not agree, please do not use the site.',
    ],
  },
  {
    heading: 'What MrTinned is',
    body: [
      'MrTinned is a market intelligence tool for tinned fish: price tracking, deal detection, restocks, and retailer comparison. It is not a shop. We do not sell products, take orders, or process payments.',
      'The weekly newsletter summarises prices, deals, and market activity. It is editorial in nature, not financial or commercial advice.',
    ],
  },
  {
    heading: 'Price data',
    body: [
      'Prices on MrTinned are sourced from third-party retailers and updated regularly. They are provided for reference only.',
      'We do not guarantee that any price is current, accurate, or available at the time you view it. Always verify on the retailer\'s own website before purchasing.',
      'MrTinned is not responsible for pricing errors, out-of-stock products, or changes in retailer policy.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'Content, editorial copy, and design on MrTinned are owned by MrTinned. Product names, brand names, and trademarks belong to their respective owners.',
    ],
  },
  {
    heading: 'Limitation of liability',
    body: [
      'MrTinned is provided as-is, without warranties of any kind. We are not liable for any loss or damage arising from your use of the site or reliance on information presented here.',
    ],
  },
  {
    heading: 'Changes',
    body: [
      'We may update these terms at any time. Changes are effective when posted. Continued use of MrTinned after changes constitutes acceptance.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions? Email hello@mrtinned.com.',
    ],
  },
]

export default function TermsPage() {
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
          Terms of Use
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
