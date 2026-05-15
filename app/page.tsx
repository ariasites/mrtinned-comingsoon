'use client'

import { useState } from 'react'

const FEATURES = [
  { title: 'Live price tracking',       desc: '53 retailers. Checked 3× daily.' },
  { title: 'Price history',             desc: 'Weeks of data. Know when a sale is real.' },
  { title: 'Deal detection',            desc: 'Sales and markdowns, surfaced automatically.' },
  { title: 'Restock notifications',     desc: "Get the email the moment it's back." },
  { title: 'Cross-retailer comparison', desc: 'One product. Every price. Side by side.' },
  { title: 'Price drop alerts',         desc: 'Set your threshold. Get the notification.' },
  { title: 'Watchlists',                desc: 'Track the tins you care about.' },
  { title: 'Pantry tracker',            desc: 'Log purchases. Know what you have.' },
  { title: 'Daily/Weekly reports',      desc: "What's worth buying. Every day and every Thursday." },
  { title: 'Shipping calculator',       desc: 'True cost across retailers, including delivery.' },
]

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
      <span style={{ color: '#25c47a', fontSize: '9px', marginTop: '4px', flexShrink: 0 }}>◆</span>
      <div>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '13px', fontWeight: 500, color: '#d9d3c4', lineHeight: 1.4 }}>
          {title}
        </div>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '11px', color: 'rgba(217,211,196,0.4)', lineHeight: 1.55 }}>
          {desc}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [email, setEmail]       = useState('')
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Signup failed')
      }
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <main style={{
      minHeight:      '100vh',
      background:     '#111009',
      display:        'flex',
      flexDirection:  'column',
      justifyContent: 'center',
      boxSizing:      'border-box',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '52px 52px', width: '100%' }}>

        {/* TOP SECTION */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '60px',
          alignItems:          'end',
        }}>

          {/* Left column */}
          <div>
            <div style={{
              fontFamily:    'var(--font-playfair), serif',
              fontSize:      '32px',
              fontWeight:    900,
              fontStyle:     'normal',
              letterSpacing: '-1px',
              color:         '#25c47a',
              lineHeight:    1,
            }}>
              MrTinned
            </div>

            <div style={{
              fontFamily:    'var(--font-inter), sans-serif',
              fontSize:      '10px',
              fontWeight:    400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(217,211,196,0.38)',
              marginTop:     '28px',
              marginBottom:  '18px',
            }}>
              The tinned fish market
            </div>

            <h1 style={{ margin: 0, padding: 0 }}>
              <span style={{
                display:       'block',
                fontFamily:    'var(--font-playfair), serif',
                fontSize:      '58px',
                fontWeight:    400,
                fontStyle:     'italic',
                color:         '#d9d3c4',
                letterSpacing: '-1.5px',
                lineHeight:    1.0,
              }}>
                Coming
              </span>
              <span style={{
                display:       'block',
                fontFamily:    'var(--font-playfair), serif',
                fontSize:      '58px',
                fontWeight:    900,
                fontStyle:     'normal',
                color:         '#25c47a',
                letterSpacing: '-1.5px',
                lineHeight:    1.0,
              }}>
                soon.
              </span>
            </h1>
          </div>

          {/* Right column */}
          <div>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize:   '16px',
              color:      'rgba(217,211,196,0.55)',
              lineHeight: 1.7,
              margin:     '0 0 32px',
            }}>
              Real market intelligence for the tinned fish obsessive. Built on live data updated daily.
            </p>

            {status === 'success' ? (
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize:   '13px',
                color:      '#25c47a',
                margin:     0,
              }}>
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{
                  display:      'flex',
                  alignItems:   'stretch',
                  borderBottom: '1px solid rgba(217,211,196,0.22)',
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    disabled={status === 'loading'}
                    style={{
                      flex:       1,
                      background: 'transparent',
                      border:     'none',
                      outline:    'none',
                      color:      '#d9d3c4',
                      fontSize:   '13px',
                      padding:    '10px 0',
                      fontFamily: 'var(--font-inter), sans-serif',
                      minWidth:   0,
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    aria-label="Subscribe"
                    style={{
                      background: 'transparent',
                      border:     'none',
                      outline:    'none',
                      cursor:     status === 'loading' ? 'default' : 'pointer',
                      color:      status === 'loading' ? 'rgba(217,211,196,0.25)' : '#25c47a',
                      fontSize:   '16px',
                      padding:    '10px 0 10px 16px',
                      transition: 'color 0.15s',
                      flexShrink: 0,
                    }}
                  >
                    {status === 'loading' ? '…' : '→'}
                  </button>
                </div>

                {status === 'error' && (
                  <p style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize:   '12px',
                    color:      'rgba(217,211,196,0.40)',
                    margin:     '8px 0 0',
                  }}>
                    {errorMsg}
                  </p>
                )}

                <p style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize:   '10px',
                  color:      'rgba(217,211,196,0.25)',
                  margin:     '8px 0 0',
                }}>
                  Weekly newsletter. Free. Unsubscribe any time.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Horizontal rule */}
        <div style={{
          borderTop:    '1px solid rgba(217,211,196,0.12)',
          marginTop:    '60px',
          marginBottom: '60px',
        }} />

        {/* BOTTOM SECTION — features */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap:           '60px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {FEATURES.slice(0, 5).map(f => (
              <FeatureItem key={f.title} title={f.title} desc={f.desc} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {FEATURES.slice(5).map(f => (
              <FeatureItem key={f.title} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
