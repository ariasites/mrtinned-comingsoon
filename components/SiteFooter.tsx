'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function SiteFooter() {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  if (pathname === '/') return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer style={{ width: '100%', marginTop: '80px' }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        paddingLeft: '24px',
        paddingRight: '24px',
        borderTop: '1px solid var(--border)',
        paddingTop: '48px',
        paddingBottom: '32px',
      }}>

        {/* Two-column grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          paddingBottom: '32px',
        }}>

          {/* Left — newsletter */}
          <div style={{ paddingRight: '48px', borderRight: '1px solid var(--border)' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              color: 'rgba(var(--text-rgb),0.40)',
              marginBottom: '12px',
            }}>
              Weekly dispatch
            </div>
            <p style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '8px',
            }}>
              The market, <em>weekly.</em>
            </p>
            <p style={{
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(var(--text-rgb),0.50)',
              lineHeight: 1.6,
              marginBottom: '24px',
              maxWidth: '300px',
            }}>
              Prices, deals, and restocks in your inbox. Free.
            </p>

            {status === 'success' ? (
              <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 300 }}>
                You&apos;re in.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', maxWidth: '320px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    background: 'rgba(var(--text-rgb),0.04)',
                    border: '1px solid var(--border)',
                    borderRight: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: 300,
                    padding: '10px 14px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    borderRadius: 0,
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    color: status === 'loading' ? 'rgba(var(--text-rgb),0.30)' : 'var(--accent)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    padding: '10px 16px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap' as const,
                    borderRadius: 0,
                  }}
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p style={{ fontSize: '12px', color: 'rgba(var(--text-rgb),0.40)', marginTop: '8px', fontWeight: 300 }}>
                Something went wrong. Try again.
              </p>
            )}
          </div>

          {/* Right — nav links */}
          <div style={{ paddingLeft: '48px' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              color: 'rgba(var(--text-rgb),0.40)',
              marginBottom: '14px',
            }}>
              MrTinned
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {[
                { href: '/market',     label: 'Market' },
                { href: '/prices',     label: 'Prices' },
                { href: '/deals',      label: 'Deals' },
                { href: '/newsletter', label: 'Newsletter' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  color: 'rgba(var(--text-rgb),0.60)',
                  textDecoration: 'none',
                }}>
                  {label}
                </Link>
              ))}
            </div>
            <a
              href="https://alltinned.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '13px',
                fontWeight: 300,
                color: '#2dd4bf',
                textDecoration: 'none',
              }}
            >
              AllTinned.com →
            </a>
          </div>

        </div>

        {/* Bottom strip — copyright */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(var(--text-rgb),0.30)' }}>
            &copy; 2026 MrTinned. Part of The Tinned Fish Universe.
          </span>
          <span style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(var(--text-rgb),0.30)' }}>
            Prices are indicative and may vary.
          </span>
        </div>

      </div>
    </footer>
  )
}
