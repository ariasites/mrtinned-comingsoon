'use client'

import { useState } from 'react'

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
    <main>

      {/* BAND 1 — HERO */}
      <div style={{ borderBottom: '1px solid rgba(var(--text-rgb),0.07)' }}>
        <div className="page-hero-grid">

          {/* Hero left — running head + headline */}
          <div style={{
            paddingTop:    '48px',
            paddingBottom: '32px',
            borderRight:   '1px solid rgba(var(--text-rgb),0.07)',
            display:       'flex',
            flexDirection: 'column',
          }}>
            <p style={{
              fontSize:      '10px',
              fontWeight:    400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(var(--text-rgb),0.60)',
              margin:        '0 0 32px',
            }}>
              The tinned fish market
            </p>
            <h1 style={{
              fontSize:      'clamp(48px, 5vw, 66px)',
              fontWeight:    400,
              lineHeight:    1.05,
              letterSpacing: '-2px',
              color:         'var(--text-primary)',
              margin:        0,
              fontFamily:    'var(--font-playfair), serif',
            }}>
              <span style={{ display: 'block', fontWeight: 400, fontStyle: 'italic', color: 'var(--text-primary)', fontFamily: 'var(--font-playfair), serif', letterSpacing: '0' }}>Coming</span>
              <span style={{ display: 'block', fontWeight: 900, fontStyle: 'italic', color: 'var(--accent)',       fontFamily: 'var(--font-playfair), serif', letterSpacing: '0' }}>soon.</span>
            </h1>
          </div>

          {/* Hero right — standfirst + email signup */}
          <div style={{
            paddingTop:    '48px',
            paddingBottom: '0',
            display:       'flex',
            flexDirection: 'column',
          }}>
            <p style={{
              fontSize:   '14px',
              fontWeight: 300,
              lineHeight: 1.9,
              color:      'var(--text-secondary)',
              margin:     0,
            }}>
              <span style={{ display: 'block' }}>Prices, deals, and restocks for the tinned fish market.</span>
              <span style={{ display: 'block' }}>Updated daily across dozens of retailers.</span>
            </p>

            {/* Email signup — occupies the stats grid position */}
            <div style={{ marginTop: '80px', paddingBottom: '32px' }}>
              {status === 'success' ? (
                <p style={{
                  fontSize:   '13px',
                  fontWeight: 300,
                  color:      'var(--accent)',
                }}>
                  You&apos;re on the list. We&apos;ll be in touch.
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{
                    display:      'flex',
                    alignItems:   'stretch',
                    borderBottom: '1px solid rgba(var(--text-rgb),0.20)',
                    marginBottom: status === 'error' ? '10px' : '14px',
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
                        color:      'var(--text-primary)',
                        fontSize:   '13px',
                        fontWeight: 300,
                        padding:    '10px 0',
                        fontFamily: 'var(--font-inter)',
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
                        color:      status === 'loading'
                          ? 'rgba(var(--text-rgb),0.25)'
                          : 'var(--accent)',
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
                      fontSize:   '12px',
                      color:      'rgba(var(--text-rgb),0.40)',
                      margin:     '0 0 14px',
                      fontWeight: 300,
                    }}>
                      {errorMsg}
                    </p>
                  )}

                  <p style={{
                    fontSize:      '10px',
                    fontWeight:    400,
                    letterSpacing: '0.05em',
                    color:         'rgba(var(--text-rgb),0.28)',
                    margin:        0,
                  }}>
                    Weekly newsletter. Unsubscribe any time.
                  </p>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>

    </main>
  )
}
