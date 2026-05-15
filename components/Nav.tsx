'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/market',     label: 'Market'     },
  { href: '/prices',     label: 'Prices'     },
  { href: '/deals',      label: 'Deals'      },
  { href: '/newsletter', label: 'Newsletter' },
]

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="3"/>
      <line x1="8" y1="1" x2="8" y2="3"/>
      <line x1="8" y1="13" x2="8" y2="15"/>
      <line x1="1" y1="8" x2="3" y2="8"/>
      <line x1="13" y1="8" x2="15" y2="8"/>
      <line x1="2.93" y1="2.93" x2="4.34" y2="4.34"/>
      <line x1="11.66" y1="11.66" x2="13.07" y2="13.07"/>
      <line x1="13.07" y1="2.93" x2="11.66" y2="4.34"/>
      <line x1="4.34" y1="11.66" x2="2.93" y2="13.07"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 10a6 6 0 1 1-7-7 4.5 4.5 0 0 0 7 7z"/>
    </svg>
  )
}

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [query, setQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    const initial = saved || 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <header
      style={{
        borderBottom: open ? 'none' : '1px solid var(--border)',
        paddingTop: '20px',
        paddingBottom: '20px',
        ...(isHome ? {} : {
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--bg)',
        }),
        ...(open ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'var(--bg)',
        } : {}),
      }}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">

        {/* Left: wordmark */}
        <Link
          href="/"
          className="accent-link"
          onClick={() => {
            setOpen(false)
            document.body.style.paddingTop = ''
          }}
          style={{
            fontWeight: 900,
            fontSize: '26px',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            flexShrink: 0,
            fontFamily: 'var(--font-playfair), serif',
          }}
        >
          MrTinned
        </Link>

        {/* Center: search */}
        <div className="nav-desktop" style={{
          flex: '0 1 280px',
          maxWidth: '280px',
          borderBottom: searchFocused ? '1px solid var(--accent)' : '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          transition: 'border-color 0.2s',
        }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search products, brands…"
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '12px',
              lineHeight: 1,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-inter)',
              padding: '4px 0',
              letterSpacing: '0.02em',
            }}
          />
        </div>

        {/* Right: desktop nav + theme toggle + mobile hamburger */}
        <div className="flex items-center" style={{ gap: '20px' }}>

          {/* Desktop nav */}
          <nav className="nav-desktop flex items-center" style={{ gap: '40px' }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="label nav-link"
                style={{ fontSize: '10px', lineHeight: 1, color: pathname === href ? 'var(--accent)' : undefined }}
              >{label}</Link>
            ))}
          </nav>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-primary)',
              opacity: 0.6,
              flexShrink: 0,
            }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger button — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => {
              const next = !open
              setOpen(next)
              if (next) {
                document.body.style.paddingTop = '64px'
              } else {
                document.body.style.paddingTop = ''
              }
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span style={{
              display: 'block',
              width: '22px',
              height: '2px',
              background: open ? 'var(--accent)' : 'var(--text-primary)',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '2px',
              background: 'var(--text-primary)',
              opacity: open ? 0 : 1,
              transition: 'opacity 0.2s',
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '2px',
              background: open ? 'var(--accent)' : 'var(--text-primary)',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>

        </div>

      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          style={{
            background: 'var(--bg)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            paddingTop: '24px',
            paddingBottom: '32px',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 flex flex-col" style={{ gap: '0' }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  setOpen(false)
                  document.body.style.paddingTop = ''
                }}
                style={{
                  color: pathname === href ? 'var(--accent)' : 'rgba(var(--text-rgb),0.60)',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(var(--text-rgb),0.07)',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
