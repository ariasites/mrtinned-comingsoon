import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MrTinned — The Tinned Fish Market',
  description: 'Live prices, deals, and market intelligence for tinned fish.',
  openGraph: {
    siteName: 'MrTinned',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ background: 'var(--bg)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Nav />
        <div style={{ paddingTop: '48px', paddingBottom: 0, flex: 1 }}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  )
}
