import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ITZFIZZ — Premium Digital Experience',
  description: 'Scroll-driven hero animation — ITZFIZZ Digital',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
