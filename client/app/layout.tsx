import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KOSKİGO',
  description: 'KOSKİ Well Management System',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}