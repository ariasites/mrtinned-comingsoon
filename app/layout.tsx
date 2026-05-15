import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

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
  title: 'MrTinned — Coming Soon',
  description: 'Prices, deals, and restocks for the tinned fish market. Updated daily across dozens of retailers.',
  openGraph: {
    siteName: 'MrTinned',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${playfair.variable} ${inter.variable}`}>
      <body style={{ background: 'var(--bg)', color: 'var(--text-primary)', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
